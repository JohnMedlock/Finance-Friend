import mongoose from 'mongoose'

const chartContainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
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
});
  
  const ChartContainer = mongoose.model('ChartContainer', chartContainerSchema);
  export default ChartContainer;