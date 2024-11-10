"use server";
import bcrypt from "bcryptjs";
import User from "../model/user_model";
import { Student } from "@/lib/model/students";
import { connectToDb } from "../utils";

// Add a new student
export const addStudent = async (formData) => {
  // student

  const {
    firstName,
    lastName,
    email,
    username,
    studentPhone,
    address,
    birthday,
    gender,
    userData,
  } = Object.fromEntries(formData);

  try {
    await connectToDb();

    // Step 2: Create the user (directly within the addStudent function)
    if (!formData) {
      throw new Error("userData is required to create the user.");
    }
    const {
      username: userUsername,
      email: userEmail,
      password,
    } = Object.fromEntries(formData);

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: userUsername,
      email: userEmail,
      password: hashedPassword,
      role: "student",
    });

    await user.save();
    console.log("User created:", user);

    // Step 2: Create student and link to user
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      username,
      studentPhone,
      address,
      birthday,
      gender,
      user: user._id,
    });
    await newStudent.save();
    console.log("Student saved to db");
    return { success: true };
  } catch (error) {
    console.log("Error adding student:", error);
    return { error: "Failed to add student" };
  }
};

// Get all students
export const getAllStudents = async () => {
  try {
    await connectToDb();
    const students = await Student.find();
    return students;
  } catch (error) {
    console.log("Error fetching students:", error);
    return { error: "Failed to retrieve students" };
  }
};

// Get a specific student by ID
export const getStudentById = async (studentId) => {
  try {
    await connectToDb();
    const student = await Student.findById(studentId);
    if (!student) {
      return { error: "Student not found" };
    }
    return student;
  } catch (error) {
    console.log("Error fetching student by ID:", error);
    return { error: "Failed to retrieve student" };
  }
};

// Update an existing student
export const updateStudent = async (studentId, formData) => {
  const {
    username: userName,
    email,
    password,
    firstName,
    lastName,
    parentsPhone,
    studentPhone,
    address,
    bloodType,
    birthday,
    gender,
    img,
  } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        userName,
        email,
        password,
        firstName,
        lastName,
        parentsPhone,
        studentPhone,
        address,
        bloodType,
        birthday,
        gender,
        img,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return { error: "Student not found" };
    }

    console.log("Student updated in db");
    return { success: true, student: updatedStudent };
  } catch (error) {
    console.log("Error updating student:", error);
    return { error: "Failed to update student" };
  }
};

// Delete a student by ID
export const deleteStudent = async (studentId) => {
  try {
    await connectToDb();
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return { error: "Student not found" };
    }

    console.log("Student deleted");
    return { success: true };
  } catch (error) {
    console.log("Error deleting student:", error);
    return { error: "Failed to delete student" };
  }
};

// Get student count
export const getStudentCount = async () => {
  try {
    await connectToDb();
    const studentCount = await Student.countDocuments(); // Counts the number of students
    return { count: studentCount };
  } catch (error) {
    console.log("Error fetching student count:", error);
    return { error: "Failed to retrieve student count" };
  }
};
