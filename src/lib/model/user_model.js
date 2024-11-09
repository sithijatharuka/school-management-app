import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
