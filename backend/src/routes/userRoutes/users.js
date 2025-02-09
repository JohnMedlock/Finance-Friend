import express from 'express'
import User from '../../schemas/User.js'
import Model from '../../schemas/Model.js'
import chartContainerRouter from './chartContainers.js'
import chatLogRouter from './chatLog.js'
import modelRouter from './models.js'

const router = express.Router()

router.post('/add', async (req, res) => {
  try {
    const { name, email, password, updatedAt, picture } = req.body;
    const newUser = new User ({ name, email, password, updatedAt, picture });

    const existingUser = await User.findOne({ email: newUser.email });    
    
    if (existingUser) {
      res.status(500).json({ message: "User with this email already exists.", user: existingUser });
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
    
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "No user found." });
      return;
    } // if

    const userModels = await Model.find({ userId: user._id });

    res.status(200).json({
      user: user,
      models: userModels 
    });
  } catch (error) {
    res.status(500).json(error);
  } // try
}); // getUser

router.post('/update', async (req, res) => {
try {
  const { email, name, updatedAt, picture } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { name, updatedAt, picture },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "No user found." });
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
      return res.status(404).json({ message: "No user found." });
    } // if

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } // try
}); // deleteUser

router.use('/models', modelRouter);
router.use('/charts', chartContainerRouter);
router.use('/chats', chatLogRouter);

export default router;
