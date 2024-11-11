"use server";
import { Teacher } from "../model/teacherModel";
import { connectToDb } from "../utils";

// Add a new teacher
export const addTeacher = async (formData) => {
  const { firstName, lastName, phone, address, email } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const newTeacher = new Teacher({
      firstName,
      lastName,
      phone,
      address,
      email,
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
  const { firstName, lastName, phone, address, email } = formData;

  try {
    await connectToDb();
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        firstName,
        lastName,
        phone,
        address,
        email,
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
