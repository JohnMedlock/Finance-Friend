import mongoose from 'mongoose'

const chartContainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balanceOverTime: {
    balanceOverTimePoints: [
      {
        date: { type: String, required: true },
        balance: { type: Number, required: true }
      }
    ],
  },
  spendingSectors: {
    spendingCategories: [
      {
        category: { type: String, required: true },
        amount: { type: Number, required: true }
      }
    ],
  },
  incomeAndSpending: {
    type: String,
    required: true
  },
  chart4: {
    type: String,
    required: true
  }
});
  
  const ChartContainer = mongoose.model('ChartContainer', chartContainerSchema);
  export default ChartContainer;