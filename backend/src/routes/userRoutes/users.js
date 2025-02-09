import express from 'express';
import User from '../../schemas/User.js';
import Model from '../../schemas/Model.js';
import chartContainerRouter from './chartContainers.js';
import chatLogRouter from './chatLog.js';
import modelRouter from './models.js';
import { getImageFromGCS } from '../../services/profileImage.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { name, email, password, updatedAt, picture } = req.body;
    const newUser = new User({ name, email, password, updatedAt, picture });

    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      res.status(500).json({
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
      return res.status(404).json({ message: 'No user found.' });
    }

    // Retrieve all models associated with the user
    const userModels = await Model.find({ userId: user._id });

    // If the user has a picture field (with a GCS URI), retrieve the file buffer
    let pictureData = null;
    if (user.picture) {
      const fileBuffer = await getImageFromGCS(user.picture);
      // Convert the file buffer to a Base64 encoded string
      pictureData = fileBuffer.toString('base64');
    }

    return res.status(200).json({
      user,
      models: userModels,
      pictureData, // Contains the Base64 encoded image data (or null if not available)
    });
  } catch (error) {
    console.error('Error in /get/:email:', error);
    return res.status(500).json({ error: error.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { email, name, updatedAt, picture } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, updatedAt, picture },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found.' });
    } // if

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  } // try
}); // updateUser

router.get('/delete/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await User.findOneAndDelete({ email: email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found.' });
    } // if

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } // try
}); // deleteUser

router.use('/models', modelRouter);
router.use('/charts', chartContainerRouter);
router.use('/chats', chatLogRouter);

export default router;
