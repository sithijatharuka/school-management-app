// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const studentSchema = new Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//       unique: true,
//       min: 3,
//       max: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       max: 50,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 6,
//     },
//     firstName: {
//       type: String,
//       required: true,
//       max: 50,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       max: 50,
//     },
//     studentPhone: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     bloodType: {
//       type: String,
//     },
//     birthDay: {
//       type: Date,
//     },
//     gender: {
//       type: String,
//       enum: ["Male", "Female", "Other"],
//     },
//     studentImg: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// export const Student =
//   mongoose.models.Student || mongoose.model("Student", studentSchema);
