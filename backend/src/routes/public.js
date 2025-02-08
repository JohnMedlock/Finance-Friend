import express from 'express';
import { auth } from 'express-openid-connect';
import { generateToken } from '../auth/authUtils.js'
import bcrypt from 'bcryptjs'
import User from '../schemas/User.js'

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    } // if

    const newUser = new User({ 
      name, 
      email, 
      password, 
      picture,
      updatedAt: new Date()
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    } // if
    
    // Compare provided password with hashed password
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


export default router;
