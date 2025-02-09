import mongoose from 'mongoose'

const modelSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    modelName: { type: String, required: true },
    link: { type: String, required: true }
  }); // modelSchema
  
  const Model = mongoose.model('Model', modelSchema);
  export default Model;