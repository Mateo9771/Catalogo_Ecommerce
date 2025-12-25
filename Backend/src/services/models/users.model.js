import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String , default: 'admin' },
})

export default mongoose.model('User', userModel);