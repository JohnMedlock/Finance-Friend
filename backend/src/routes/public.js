import express from 'express';
import { auth } from 'express-openid-connect';
import { generateToken } from '../auth/authUtils.js';
import bcrypt from 'bcryptjs';
import User from '../schemas/User.js';
import textTo3D from '../services/textTo3D.js';
import { uploadPdfBufferToGCS, ocrPdfInGCS } from '../services/ocr.js';
import chat from '../services/chatbot.js';
import multer from 'multer';
import Model from '../schemas/Model.js';

const router = express.Router();

const DEFAULT_CHARACTERS = [
  {
    modelName: 'snoop dog',
    link: 'https://assets.meshy.ai/fafbdc5e-2a2c-4af8-9f99-c219ffb0ab04/tasks/0194e8ce-f303-793c-ae8c-863b741d23eb/output/model.glb?Expires=4892659200&Signature=bfULN5lhhHAOoMtn6rDgLAQ8KOzgCWLI8fP1hNggHqMcNSPPd6gYntNDkQBRvn-5BMdPIkD42WqGKts6DNYzWSKnoAfmJe7Jpo6ACJl6EaTDyiMsUGKa45MKNtJ7V8okwXSHJVOSkDY8O7vYzmyeiZgkxYoyhE60cGA1b37U9GzddVaWbcgw2MqiE-CntqN9xwIAwF2afPEMvzn-6xAynYv~Qnj7gIfGJHxtcsZk3QahSqcBQKURJbTeGHuisXmIigoFylpyOirscHHhok3HAUAmyeUS3GkWpVmnqNmPeHNdAjUn7oKRtljKdh~GRhkG~lh3eWNo7o-XNiXoMhRTFQ__&Key-Pair-Id=KL5I0C8H7HX83',
  },
  {
    modelName: 'barack obama',
    link: 'https://assets.meshy.ai/fafbdc5e-2a2c-4af8-9f99-c219ffb0ab04/tasks/0194e8db-7a9b-793d-ab27-5fd9b90ac029/output/model.glb?Expires=4892659200&Signature=W7YC4ndBhe489Gd2j6JZ7SuzuLUoGR73DZVbidswbB-eO-wAGnNhaviuB2FQsuz2TJMJuLu7escK74hgvBwGoH-2NFPEmvsyJLhH7LQ7v2LKXoZJlhzGfF-9XGlEppc5WtcLpDrj31gDWUA8uDexdOxET27MkDWX7kgcI6O8NBLKkqe-E1Ic48XkgVztk1KwQcCydiY5tXq1CTOmZ6OSmvmEM~YG1BMizHtkXSXaDxy~Ot9V38tDbHMe-kDHOxkHNoBmOR5goMIQFfCZu7KqyA7YUWVGjZNPtc9cJwTxXQFhQJSnG1S5HlXySWaq-J890D-yhvhV-egFO68nvDuR9g__&Key-Pair-Id=KL5I0C8H7HX83',
  },
];

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

    const modelDocs = DEFAULT_CHARACTERS.map((char) => ({
      userId: newUser._id,
      modelName: char.modelName,
      link: char.link,
    }));

    await Model.insertMany(modelDocs);

    res.status(201).json({
      message: 'User registered successfully. Default characters created.',
      user: newUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    } // if

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    } // if

    const token = generateToken(user);

    res.json({ isLoggedIn: true, user, jwt: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } // try
});

const upload = multer({ storage: multer.memoryStorage() });

export default router;
