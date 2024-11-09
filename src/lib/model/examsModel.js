import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  examDate: { type: Date, required: true },
  subject: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  duration: { type: String, required: true }, // Duration in hours/minutes
  createdAt: { type: Date, default: Date.now },
});

export const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);
