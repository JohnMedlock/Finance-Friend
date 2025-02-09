// protected.js
import express from 'express';
import multer from 'multer';
import textTo3D from '../services/textTo3D.js';
import userRoutes from './userRoutes/users.js';
import { uploadPdfBufferToGCS, ocrPdfInGCS } from '../services/ocr.js';
import chat from '../services/chatbot.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

router.use('/users', userRoutes);

// Example endpoint: returns the GLB file from Meshy
router.get('/textTo3D', async (req, res) => {
  try {
    const glbBuffer = await textTo3D('Snoop Dog head close up');

    // Set appropriate content-type for GLB
    res.setHeader('Content-Type', 'model/gltf-binary');

    // Send the raw buffer
    return res.send(glbBuffer);
  } catch (error) {
    console.error('Error in /textTo3D endpoint:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Example PDF OCR endpoint
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
