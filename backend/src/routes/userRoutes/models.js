import express from 'express'
import User from '../../schemas/User.js'
import Model from '../../schemas/Model.js'

const router = express.Router()
  
router.post('/add', async (req, res) => {
try {
    const { email, modelName, link } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "No user found." });
    } // if

    const model = await Model.findOne({ userId: user._id, modelName: modelName });
    
    if (model) {
        return res.status(409).json({ message: "Model already exists." });
    } // if
    
    const uid = user._id;
    const newModel = new Model ({ userId: uid, modelName: modelName, link: link });

    await newModel.save();

    res.status(201).json(newModel);
    } catch (error) {
    res.status(500).json({ message: error });
} // try
}); // addModel


router.get('/getModelsByUser/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
    
        if (!user) {
            return res.status(404).json({ message: "No user found." });
        } // if
    
        const models = await Model.find({ userId: user._id });
        
        if (!models.length) {
            return res.status(404).json({ message: "No model found." });
        } // if
    
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ message: error });
    } // try
    }); // getModel

    
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