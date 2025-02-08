import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  updatedAt: { type: Date, required: false },
  picture: { type: String, required: false }
}); // userSchema

const User = mongoose.model('User', userSchema);

export default User
