import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
// route imports
import adminRoutes from './routes/admin.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import studentRoutes from './routes/student.routes.js';
import userRoutes from './routes/user.routes.js';
import timetableRoutes from "./routes/timetable.routes.js";
import syllabusRoutes from './routes/syllabus.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import eventRoutes from './routes/event.routes.js';
import noticeRoutes from './routes/notice.routes.js';
import classRoutes from './routes/class.routes.js';
import complaintRoutes from './routes/complaint.routes.js';
import leaveRoutes from './routes/leave.routes.js';
import meetingRoutes from './routes/meeting.routes.js';
import resourceRoutes from './routes/resource.routes.js';
import attendanceRoutes from './routes/attendance.routes.js'
import cookieParser from 'cookie-parser';
import feeRoutes from './routes/fee.routes.js';
import resultRoutes from './routes/result.routes.js';
import paymentRoutes from './routes/payment.routes.js';




const app = express();
// app.use(cors());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));


app.use(express.json());

app.use(cookieParser());
// app.use('/uploads/results', express.static(path.join(__dirname, 'uploads/results')));
app.use('/uploads', express.static('uploads'));

// app.use('/uploads', (req, res, next) => {
//   if (req.path.endsWith('.pdf')) {
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'inline');
//   }
//   next();
// }, express.static(path.resolve('uploads')));

// routes
app.use('/api/admins', adminRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/user', userRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api/events', eventRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/leaves', leaveRoutes);
app.use("/api/meetings", meetingRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.get('/', (req, res) => {
  res.send('School Management System API running...');
});
app.use('/api/fees', feeRoutes);
app.use('/api/results', resultRoutes); // ✅ This mounts /api/results
app.use('/api/payment', paymentRoutes); // ✅ Mounting route


export { app }