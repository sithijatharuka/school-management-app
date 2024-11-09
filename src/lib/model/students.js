import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    studentPhone: { type: String, required: true, unique: true },
    address: String,
    birthday: Date,
    gender: { type: String, enum: ["Male", "Female"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
