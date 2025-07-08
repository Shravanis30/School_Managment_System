

import mongoose from "mongoose";

const meetingHistorySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  title: String,
  date: String,
  by: String,
  summary: String,
}, { timestamps: true });

export default mongoose.model("MeetingHistory", meetingHistorySchema);