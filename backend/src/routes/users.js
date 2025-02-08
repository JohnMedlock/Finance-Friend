import express from 'express'
import User from '../schemas/User.js'
import Model from '../schemas/Model.js'

const router = express.Router()

router.get('/add', async (req, res) => {
  try {
    const { name, email, updatedAt, picture } = req.body;
    const newUser = new User ({ name, email, updatedAt, picture });

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

router.get('/get', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "No user found." });
      return;
    } // if

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error  });
  } // try
}); // getUser

router.get('/update', async (req, res) => {
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

router.get('/delete', async (req, res) => {
  try {
    const { email } = req.body;
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "No user found." });
    } // if

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } // try
}); // deleteUser

router.get('/add-model', async (req, res) => {
  try {
    const { email, modelName, link } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    } // if
    
    const uid = user._id;
    const newModel = new Model ({ userId: uid, modelName: modelName, link: link });

    await newModel.save();

    res.status(201).json(newModel);
      } catch (error) {
    res.status(500).json({ message: error });
  } // try
}); // addModel

router.get('/get-model', async (req, res) => {
  try {
    const { email, modelName } = req.body;
    const model = await User.findOne({ email: email, modelName: modelName });

    if (!model) {
      return res.status(404).json({ message: "No model found." });
    } // if

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error });
  } // try
}); // getModel

export default router;
