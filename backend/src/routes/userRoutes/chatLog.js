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

    const model = await Model.findOne({ email });
    if (!model) {
        return res.status(404).json({ message: "No model found." });
    } // if

    const uid = user._id;

    const storedLog = new ChatLog ({ 
        userId: uid, 
        modelName: modelName,
        messageContent: content,
        sender: sender
    });

    await storedLog.save();

    res.status(201).json(storedLog);
    } catch (error) {
    res.status(500).json({ message: error });
} // try
}); // store

router.get('/get-user-character', async (req, res) => {
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

        const chatlog = await ChatLog.find({ userId: user._id, modelName: modelName }).sort({ timestamp: -1 });
        
        if (!chatlog.length) {
            return res.status(404).json({ message: 'No chat logs found for this model.' });
        } // if

        res.status(200).json(chatlog);
    } catch (error) {
        res.status(500).json({ message: error });
    } // try
});

router.get('/get-user', async (req, res) => {
    try {
        const { email, modelName } = req.query;
        const user = await User.findOne({ email: email });
    
        if (!user) {
            return res.status(404).json({ message: "No user found." });
        } // if
    
        const chatlog = await ChatLog.find({ userId: user._id }).sort({ timestamp: -1 });
        
        if (!chatlog.length) {
            return res.status(404).json({ message: 'No chat logs found for this user.' });
        } // if
    
        res.status(200).json(chatlog);
    } catch (error) {
        res.status(500).json({ message: error });
    } // try
}); // getModel

export default router;