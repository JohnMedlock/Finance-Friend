import mongoose from 'mongoose'

// TODO: update when needed
const chartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chart1: {
      value1: {
        type: Number,
        required: true
      },
      value2: {
        type: Number,
        required: true
      }
    },
    chart2: {
      type: String,
      required: true
    },
    chart3: {
      type: String,
      required: true
    },
    chart4: {
      type: String,
      required: true
    }
  });
  
  const Chart = mongoose.model('Chart', chartSchema);
  export default Chart;