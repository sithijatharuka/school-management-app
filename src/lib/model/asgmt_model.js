import mongoose from "mongoose";

const astSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: Date, required: true },
  subject: { type: String, required: true },
});

export const Ast = mongoose.models.Ast || mongoose.model("Ast", astSchema);
