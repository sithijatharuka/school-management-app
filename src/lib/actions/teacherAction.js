"use server";
import bcrypt from "bcryptjs";
import { Teacher } from "../model/teacherModel";
import User from "../model/user_model";
import { connectToDb } from "../utils";

// Add a new teacher
export const addTeacher = async (formData) => {
  const { username, firstName, lastName, phone, address, email } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    // Step 2: Create the user (directly within the addStudent function)
    if (!formData) {
      throw new Error("userData is required to create the user.");
    }
    const { username, email, password } = Object.fromEntries(formData);

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "teacher",
    });

    await user.save();
    console.log("User created:", user);

    // Step 2: Create student and link to user

    const newTeacher = new Teacher({
      username,
      firstName,
      lastName,
      phone,
      address,
      email,
      user: user._id,
    });
    await newTeacher.save();
    console.log("Teacher saved to db");
    return { success: true };
  } catch (error) {
    console.log("Error adding teacher:", error);
    return { error: true };
  }
};

// Get all teachers
export const getAllTeachers = async () => {
  try {
    await connectToDb();
    const teachers = await Teacher.find();
    return teachers;
  } catch (error) {
    console.log("Error fetching teachers:", error);
    return { error: "Failed to retrieve teachers" };
  }
};

// Get a specific teacher by ID
export const getTeacherById = async (teacherId) => {
  try {
    await connectToDb();
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return { error: "Teacher not found" };
    }
    return teacher.toObject();
  } catch (error) {
    console.log("Error fetching teacher by ID:", error);
    return { error: "Failed to retrieve teacher" };
  }
};

// Update an existing teacher
export const updateTeacher = async (teacherId, formData) => {
  const {
    firstName,
    lastName,
    teacherId: updatedTeacherId,
    phone,
    address,
    email,
    password,
  } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        firstName,
        lastName,
        teacherId: updatedTeacherId,
        phone,
        address,
        email,
        password,
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return { error: "Teacher not found" };
    }

    console.log("Teacher updated in db");
    return { success: true, teacher: updatedTeacher };
  } catch (error) {
    console.log("Error updating teacher:", error);
    return { error: "Failed to update teacher" };
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (teacherId) => {
  try {
    await connectToDb();
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      return { error: "Teacher not found" };
    }

    console.log("Teacher deleted");
    return { success: true };
  } catch (error) {
    console.log("Error deleting teacher:", error);
    return { error: "Failed to delete teacher" };
  }
};

// Get student count
export const getTeacherCount = async () => {
  try {
    await connectToDb();
    const studentCount = await Teacher.countDocuments(); // Counts the number of students
    return { counts: studentCount };
  } catch (error) {
    console.log("Error fetching student count:", error);
    return { error: "Failed to retrieve student count" };
  }
};
