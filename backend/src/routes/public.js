import bcrypt from 'bcryptjs';
import express from 'express';
import multer from 'multer';
import { generateToken } from '../auth/authUtils.js';
import User from '../schemas/User.js';
import chat from '../services/chatbot.js';
import { ocrPdfInGCS, uploadPdfBufferToGCS } from '../services/ocr.js';
import textTo3D from '../services/textTo3D.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
      updatedAt: new Date(),
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({ isLoggedIn: true, user, jwt: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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