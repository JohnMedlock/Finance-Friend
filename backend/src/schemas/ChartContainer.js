import mongoose from 'mongoose'

const chartContainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  accountBalanceOverTime: [
    {
      date: { type: String, required: true },
      balance: { type: Number, required: true }
    }
  ],
  spendingCategories: [
    {
      category: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  timestamp: { type: Date, default: Date.now },
});
  
const ChartContainer = mongoose.model('ChartContainer', chartContainerSchema);
export default ChartContainer;