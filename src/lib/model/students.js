import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    studentPhone: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
