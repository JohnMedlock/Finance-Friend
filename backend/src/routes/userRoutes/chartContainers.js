import express from 'express'
import User from '../../schemas/User.js'
import ChartContainer from '../../schemas/ChartContainer.js'

const router = express.Router()
  
router.post('/add', async (req, res) => {
    try {
        const { email, balanceOverTimePoints, spendingCategories, spending, income } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        } // if

        const uid = user._id;
        const newContainer = new ChartContainer({
            userId: uid,
            balanceOverTime: {
                balanceOverTimePoints: balanceOverTimePoints
            },
            spendingSectors: {
                spendingCategories: spendingCategories
            },
            incomeAndSpending: {
                spending: spending,
                income: income
            }
        });

        await newContainer.save();

        res.status(201).json(newContainer);
    } catch (error) {
        res.status(500).json({ message: error });
    } // try
}); // addChartContainer

router.get('/get', async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        } // if

        const container = await ChartContainer.findOne({ userId: user._id });
        
        if (!container) {
            return res.status(404).json({ message: "No charts found." });
        } // if

        res.status(200).json(container);
    } catch (error) {
        res.status(500).json({ message: error });
    } // try
}); // getChartContainer

router.post('/update', async (req, res) => {
    try {
        const { email, balanceOverTimePoints, spendingCategories, spending, income } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        } // if

        const updatedContainer = await ChartContainer.findOneAndUpdate(
            { userId: user._id },
            { 
                $set: {
                    balanceOverTime: { balanceOverTimePoints },
                    spendingSectors: { spendingCategories },
                    incomeAndSpending: { spending, income }
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedContainer) {
            return res.status(404).json({ message: "No container found." });
        } // IF

        res.status(200).json(updatedContainer);
    } catch (error) {
        res.status(500).json({ message: error });
    } // try
}); // updateChartContainer


export default router;