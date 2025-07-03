// models/meeting.model.js
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  participants: [String],
  mode: String,
  link: String,
  status: { type: String, default: "Scheduled" },
}, { timestamps: true });

export default mongoose.model("Meeting", meetingSchema);
