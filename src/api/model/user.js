import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  avatar_URL: { type: String },
})

const User = mongoose.model('User', UserSchema, 'Users')
export default User
