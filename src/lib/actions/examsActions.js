"use server";
import { connectToDb } from "../utils"; // Update with your database connection utility
import { Exam } from "../model/examsModel";

// Add a new exam
export const addExam = async (formData) => {
  const { examName, examDate, subject, totalMarks, duration } =
    Object.fromEntries(formData);

  try {
    await connectToDb();
    const newExam = new Exam({
      examName,
      examDate: new Date(examDate),
      subject,
      totalMarks,
      duration,
    });

    await newExam.save();
    console.log("Exam saved to db");
    return { success: true };
  } catch (error) {
    console.log("Error adding exam:", error);
    return { error: "Failed to add exam" };
  }
};

// Get all exams
export const getAllExams = async () => {
  try {
    await connectToDb();
    const exams = await Exam.find();
    return exams;
  } catch (error) {
    console.log("Error fetching exams:", error);
    return { error: "Failed to retrieve exams" };
  }
};

// Get a specific exam by ID
export const getExamById = async (examId) => {
  try {
    await connectToDb();
    const exam = await Exam.findById(examId);
    if (!exam) {
      return { error: "Exam not found" };
    }
    return exam;
  } catch (error) {
    console.log("Error fetching exam by ID:", error);
    return { error: "Failed to retrieve exam" };
  }
};

// Update an existing exam
export const updateExam = async (examId, formData) => {
  const { examName, examDate, subject, totalMarks, duration } = formData;

  try {
    await connectToDb();
    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      {
        examName,
        examDate: new Date(examDate),
        subject,
        totalMarks,
        duration,
      },
      { new: true }
    );

    if (!updatedExam) {
      return { error: "Exam not found" };
    }

    console.log("Exam updated in db");
    return { success: true, exam: updatedExam };
  } catch (error) {
    console.log("Error updating exam:", error);
    return { error: "Failed to update exam" };
  }
};

// Delete an exam by ID
export const deleteExam = async (examId) => {
  try {
    await connectToDb();
    const deletedExam = await Exam.findByIdAndDelete(examId);
    if (!deletedExam) {
      return { error: "Exam not found" };
    }

    console.log("Exam deleted");
    return { success: true };
  } catch (error) {
    console.log("Error deleting exam:", error);
    return { error: "Failed to delete exam" };
  }
};
