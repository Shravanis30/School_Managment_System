import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  title: String,
  date: String,
  time: String,
  participants: [String],
  mode: String,
  link: String,
  status: { type: String, default: "Scheduled" },
}, { timestamps: true });

export default mongoose.model("Meeting", meetingSchema);
