// models/Syllabus.js
import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  class: { type: String, required: true, unique: true },
  syllabusURL: { type: String, required: true }
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);
export default Syllabus;


