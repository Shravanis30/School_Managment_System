// // routes/meeting.routes.js
// import express from "express";
// import nodemailer from "nodemailer";
// import Meeting from "../models/meeting.model.js"; // create this model
// import Teacher from "../models/teacher.model.js"; // to fetch emails

// const router = express.Router();

// // GET all meetings
// router.get("/", async (req, res) => {
//   try {
//     const meetings = await Meeting.find().sort({ createdAt: -1 });
//     res.json(meetings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch meetings" });
//   }
// });

// // POST create meeting and send emails
// router.post("/add", async (req, res) => {
//   try {
//     const newMeeting = new Meeting(req.body);
//     await newMeeting.save();

//     // send email to all teachers
//     const teachers = await Teacher.find({}, "email");
//     const emails = teachers.map((t) => t.email);

//     if (emails.length > 0) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.SMTP_USER, // your email
//           pass: process.env.SMTP_PASS, // your app password
//         },
//       });

//       const mailOptions = {
//         from: process.env.SMTP_USER,
//         to: emails,
//         subject: `New Meeting Scheduled: ${newMeeting.title}`,
//         html: `
//           <p><strong>Title:</strong> ${newMeeting.title}</p>
//           <p><strong>Date:</strong> ${newMeeting.date}</p>
//           <p><strong>Time:</strong> ${newMeeting.time}</p>
//           <p><strong>Mode:</strong> ${newMeeting.mode}</p>
//           <p><strong>Link:</strong> <a href="${newMeeting.link}">${newMeeting.link}</a></p>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//     }

//     res.status(201).json({ message: "Meeting created and email sent" });
//   } catch (error) {
//     console.error("Error creating meeting:", error);
//     res.status(500).json({ error: "Failed to create meeting" });
//   }
// });

// export default router;

import express from "express";
import nodemailer from "nodemailer";
import Meeting from "../models/meeting.model.js";
import MeetingHistory from "../models/meetingHistory.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import authMiddleware, { authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Helper function to send emails
const sendMeetingEmails = async (meeting, adminId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  let recipients = [];
  
  // Get teachers if selected
  if (meeting.participants.includes('Teacher')) {
    const teachers = await Teacher.find({ adminId }, "email");
    recipients = [...recipients, ...teachers.map(t => t.email)];
  }
  
  // Get students if selected
  if (meeting.participants.includes('Student')) {
    const students = await Student.find({ adminId }, "email");
    recipients = [...recipients, ...students.map(s => s.email)];
  }
  
  // Remove duplicates
  recipients = [...new Set(recipients.filter(Boolean))];
  
  if (recipients.length > 0) {
    const mailOptions = {
      from: `EduConnect <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: `New Meeting Scheduled: ${meeting.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6e8efb, #a777e3); padding: 30px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Meeting Scheduled</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">${meeting.title}</h2>
            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <p><strong>📅 Date:</strong> ${meeting.date}</p>
              <p><strong>⏰ Time:</strong> ${meeting.time}</p>
              <p><strong>📍 Mode:</strong> ${meeting.mode}</p>
              ${meeting.link ? `<p><strong>🔗 Link:</strong> <a href="${meeting.link}" target="_blank">${meeting.link}</a></p>` : ''}
            </div>
            <p style="color: #666; line-height: 1.6;">This meeting has been scheduled by the administration. Please mark your calendar accordingly.</p>
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 14px;">
              <p>© ${new Date().getFullYear()} EduConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
};

// GET all meetings (Admin/Teacher)
router.get("/", authMiddleware, authorizeRole("admin", "teacher"), async (req, res) => {
  try {
    const filter = req.role === "admin"
      ? { adminId: req.user._id, status: "Scheduled" }
      : { adminId: req.user.adminId, status: "Scheduled" };
    
    // Filter out meetings that ended more than 1 hour ago
    const now = new Date();
    const meetings = await Meeting.find(filter);
    
    const filteredMeetings = meetings.filter(meeting => {
      const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
      const meetingEndTime = new Date(meetingDateTime.getTime() + 60 * 60 * 1000);
      return meetingEndTime > now;
    });
    
    res.json(filteredMeetings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
});

// POST create meeting (Admin only)
router.post("/add", authMiddleware, authorizeRole("admin"), async (req, res) => {
  try {
    const newMeeting = new Meeting({
      ...req.body,
      adminId: req.user._id,
    });

    await newMeeting.save();
    
    // Send emails to participants
    await sendMeetingEmails(newMeeting, req.user._id);

    res.status(201).json({ message: "Meeting created and emails sent" });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Failed to create meeting" });
  }
});

// PATCH mark meeting as done
router.patch("/:id/complete", authMiddleware, authorizeRole("admin"), async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    // Move to history
    const historyEntry = new MeetingHistory({
      title: meeting.title,
      date: meeting.date,
      by: "Admin",
      summary: `${meeting.title} meeting conducted.`,
      adminId: meeting.adminId,
    });
    
    await historyEntry.save();
    await Meeting.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Meeting marked as completed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to complete meeting" });
  }
});

// GET meeting history
router.get("/history", authMiddleware, authorizeRole("admin"), async (req, res) => {
  try {
    const history = await MeetingHistory.find({ adminId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// DELETE meeting history
router.delete("/history/:id", authMiddleware, authorizeRole("admin"), async (req, res) => {
  try {
    await MeetingHistory.findByIdAndDelete(req.params.id);
    res.json({ message: "History record deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete history" });
  }
});

export default router;