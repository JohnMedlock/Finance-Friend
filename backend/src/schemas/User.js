// TODO: Update with correct schema

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
}); // userSchema

const User = mongoose.model('User', userSchema);

module.exports = User;
