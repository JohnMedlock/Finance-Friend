import express from 'express';
import { auth } from 'express-openid-connect';
import { generateToken } from '../auth/authUtils.js';
import textTo3D from '../services/textTo3D.js';
import { uploadPdfBufferToGCS, ocrPdfInGCS } from '../services/ocr.js';
import chat from '../services/chatbot.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/textTo3D', async (req, res) => {
  const refine = await textTo3D('Snoop Dog head close up');
  res.json(refine);
});

router.post(
  '/parse-bank-statement',
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file provided.' });
      }

      const bucketName = 'financefriend';
      const destinationFileName = `bank-statements/${Date.now()}-${
        req.file.originalname
      }`;
      await uploadPdfBufferToGCS(
        req.file.buffer,
        bucketName,
        destinationFileName,
        req.file.mimetype,
      );

      const gcsSourceUri = `gs://${bucketName}/${destinationFileName}`;
      const gcsDestinationUri = `gs://${bucketName}/ocr-output/${Date.now()}/`;
      const bankStatementText = await ocrPdfInGCS(
        gcsSourceUri,
        gcsDestinationUri,
      );

      const chatResponseString = await chat(bankStatementText, 'snoop dog');
      console.log(chatResponseString);

      let rawOutput = chatResponseString || '';
      rawOutput = rawOutput.replace(/```(json)?/g, '').replace(/```/g, '');

      let parsedJson;
      try {
        parsedJson = JSON.parse(rawOutput);
      } catch (e) {
        return res.status(500).json({
          error: 'ChatGPT did not return valid JSON.',
          rawOutput,
        });
      }

      return res.status(200).json(parsedJson);
    } catch (error) {
      console.error('Error in /parse-bank-statement:', error);
      return res.status(500).json({ error: error.message });
    }
  },
);

export default router;
