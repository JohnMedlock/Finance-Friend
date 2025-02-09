// protected.js
import express from 'express';
import multer from 'multer';
import textTo3D from '../services/textTo3D.js';
import userRoutes from './userRoutes/users.js';
import { uploadPdfBufferToGCS, ocrPdfInGCS } from '../services/ocr.js';
import chatPDF, { chat } from '../services/chatbot.js';
import User from '../schemas/User.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

router.use('/users', userRoutes);

router.post('/textTo3D', async (req, res) => {
  try {
    const { email, prompt, modelName } = req.body;
    console.log(req.body.email);
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const glbBuffer = await textTo3D(email, prompt, modelName);
    res.setHeader('Content-Type', 'model/gltf-binary');
    res.send(glbBuffer);
  } catch (error) {
    console.error('Error in /textTo3D endpoint:', error);
    return res.status(500).json({ error: error.message });
  }
});

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/parse-bank-statement',
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file provided.' });
      }

      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
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

      const chatResponseString = await chatPDF(bankStatementText, name);

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

router.post('/chat', upload.none(), async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const name = req.body.Name;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const response = await chat(prompt, name);
    return res.status(200).json({ response: response });
  } catch (error) {
    console.error('Error in /chat:', error);
    return res.status(500).json({ error: error.message });
  }
});

router.post('/update-profile', upload.single('file'), async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    let picturePath;
    if (req.file) {
      const bucketName = 'financefriend-profile-pictures';
      const destinationFileName = `${Date.now()}-${req.file.originalname}`;
      picturePath = await uploadProfileImageToGCS(
        req.file.buffer,
        bucketName,
        destinationFileName,
        req.file.mimetype,
      );
    }

    const updatedFields = {
      updatedAt: new Date(),
    };

    if (name) {
      updatedFields.name = name;
    }

    if (picturePath) {
      updatedFields.picture = picturePath;
    }

    const updatedUser = await User.findOneAndUpdate({ email }, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: 'No user found with that email.' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
