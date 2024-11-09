import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String, required: true },
  resultDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Result = mongoose.model("Result", resultSchema);
