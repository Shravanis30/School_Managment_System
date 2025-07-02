import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

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



const app = express();
app.use(cors());
app.use(express.json());

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



// Optional test route
app.get('/', (req, res) => {
  res.send('School Management System API running...');
});


export { app }