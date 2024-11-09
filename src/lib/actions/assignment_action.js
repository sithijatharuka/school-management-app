"use server";
import { Assignment } from "../model/asgmt_model";
import { connectToDb } from "../utils";

// Add a new assignment
export const addAssignment = async (formData) => {
  const { title, description, subject, dueDate, createdBy, isCompleted } =
    formData;

  try {
    await connectToDb();
    const newAssignment = new Assignment({
      title,
      description,
      subject,
      dueDate,
      createdBy,
      isCompleted,
    });
    await newAssignment.save();
    console.log("Assignment saved to DB");
    return { success: true };
  } catch (error) {
    console.error("Error adding assignment:", error);
    return { error: "Failed to add assignment" };
  }
};

// Get all assignments
export const getAllAssignments = async () => {
  try {
    await connectToDb();
    const assignments = await Assignment.find();
    return assignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return { error: "Failed to retrieve assignments" };
  }
};

// Get an assignment by ID
export const getAssignmentById = async (assignmentId) => {
  try {
    await connectToDb();
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return { error: "Assignment not found" };
    }
    return assignment;
  } catch (error) {
    console.error("Error fetching assignment by ID:", error);
    return { error: "Failed to retrieve assignment" };
  }
};

// Update an assignment
export const updateAssignment = async (assignmentId, formData) => {
  const { title, description, subject, dueDate, createdBy, isCompleted } =
    formData;

  try {
    await connectToDb();
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        title,
        description,
        subject,
        dueDate,
        createdBy,
        isCompleted,
      },
      { new: true } // Return updated document
    );

    if (!updatedAssignment) {
      return { error: "Assignment not found" };
    }

    console.log("Assignment updated in DB");
    return { success: true, assignment: updatedAssignment };
  } catch (error) {
    console.error("Error updating assignment:", error);
    return { error: "Failed to update assignment" };
  }
};

// Delete an assignment by ID
export const deleteAssignment = async (assignmentId) => {
  try {
    await connectToDb();
    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
    if (!deletedAssignment) {
      return { error: "Assignment not found" };
    }

    console.log("Assignment deleted");
    return { success: true };
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return { error: "Failed to delete assignment" };
  }
};
