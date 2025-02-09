import express from 'express'
import Model from '../../schemas/Model.js'
import ChatLog from '../../schemas/ChatLog.js'

const router = express.Router()
  
router.post('/store', async (req, res) => {
try {
    const { email, content, sender, modelName } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "No user found." });
    } // if

    const model = await Modeel.findOne({ email });
    if (!model) {
        return res.status(404).json({ message: "No model found." });
    } // if

    const uid = user._id;
    const mid = model._id;

    const stordLog = new ChatLog ({ 
        userId: uid, 
        modelId: mid,
        messageContent: content,
        sender: sender
    });

    await newModel.save();

    res.status(201).json(newModel);
    } catch (error) {
    res.status(500).json({ message: error });
} // try
}); // addModel

router.get('/get', async (req, res) => {
try {
    const { email, modelName } = req.query;
    const user = await User.findOne({ email: email });

    if (!user) {
    return res.status(404).json({ message: "No user found." });
    } // if

    const model = await Model.findOne({ userId: user._id, modelName: modelName });
    
    if (!model) {
    return res.status(404).json({ message: "No model found." });
    } // if

    res.status(200).json(model);
} catch (error) {
    res.status(500).json({ message: error });
} // try
}); // getModel

export default router;