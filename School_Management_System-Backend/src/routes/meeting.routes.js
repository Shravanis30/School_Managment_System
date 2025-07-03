// routes/meeting.routes.js
import express from "express";
import nodemailer from "nodemailer";
import Meeting from "../models/meeting.model.js"; // create this model
import Teacher from "../models/teacher.model.js"; // to fetch emails

const router = express.Router();

// GET all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
});

// POST create meeting and send emails
router.post("/add", async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    await newMeeting.save();

    // send email to all teachers
    const teachers = await Teacher.find({}, "email");
    const emails = teachers.map((t) => t.email);

    if (emails.length > 0) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, // your email
          pass: process.env.SMTP_PASS, // your app password
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: emails,
        subject: `New Meeting Scheduled: ${newMeeting.title}`,
        html: `
          <p><strong>Title:</strong> ${newMeeting.title}</p>
          <p><strong>Date:</strong> ${newMeeting.date}</p>
          <p><strong>Time:</strong> ${newMeeting.time}</p>
          <p><strong>Mode:</strong> ${newMeeting.mode}</p>
          <p><strong>Link:</strong> <a href="${newMeeting.link}">${newMeeting.link}</a></p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ message: "Meeting created and email sent" });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Failed to create meeting" });
  }
});

export default router;
