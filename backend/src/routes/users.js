import express from 'express';
import mongoose from 'mongoose';
import User from '../schemas/User.js';

const router = express.Router();

router.get('/add', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = new User({ name, email, phone });

    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      res
        .status(500)
        .json({
          message: 'User with this email already exists.',
          user: existingUser,
        });
      return;
    } // if

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  } // try
}); // addUser

router.get('/get/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'No user found.' });
      return;
    } // if

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  } // try
}); // getUserByEmail

export default router;
