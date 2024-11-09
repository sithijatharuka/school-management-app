// "use server";
// import { Student } from "./models";
// import { connectToDb } from "./utils";

// export const addStudent = async (formData) => {
//   const {
//     username: userName,
//     email,
//     password,
//     firstName,
//     lastName,
//     studentPhone,
//     address,
//     bloodType,
//     birthday,
//     gender,
//     img,
//   } = Object.fromEntries(formData);

//   console.log("Username:", userName);
//   console.log("Email:", email);
//   console.log("Password:", password);
//   console.log("First Name:", firstName);
//   console.log("Last Name:", lastName);
//   console.log("Parent's Phone:", parentsPhone);
//   console.log("Student's Phone:", studentPhone);
//   console.log("Address:", address);
//   console.log("Blood Type:", bloodType);
//   // console.log("Birthday:", birthday);
//   // console.log("Gender:", gender);
//   // console.log("Image:", img);
//   try {
//     await connectToDb();
//     const newStudent = new Student({
//       userName,
//       email,
//       password,
//       firstName,
//       lastName,
//       studentPhone,
//       address,
//     });
//     await newStudent.save();
//     console.log("saved to db");
//     return { success: true };
//   } catch (error) {
//     console.log(error);
//     // Serialize validation errors into plain object with messages
//     // const errorDetails = {};
//     // for (const field in error.errors) {
//     //   errorDetails[field] = error.errors[field].message;
//     // }
//     // return { error: "Something went wrong!", details: errorDetails };
//   }
// };

// export const getAllStudents = async () => {
//   try {
//     await connectToDb();
//     const students = await Student.find();
//     return students;
//   } catch (error) {
//     console.log(error);
//     return { error: "Something went wrong!" };
//   }
// };

// export const deleteStudent = async (studentId) => {
//   try {
//     await connectToDb();
//     await Student.findByIdAndDelete(studentId);
//     console.log("Student deleted");
//     return { success: true };
//   } catch (error) {
//     console.log(error);
//     return { error: "Student deletion failed!" };
//   }
// };
