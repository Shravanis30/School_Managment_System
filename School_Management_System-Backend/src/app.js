import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

// route imports
import adminRoutes from './routes/admin.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import studentRoutes from './routes/student.routes.js';
import userRoutes from './routes/user.routes.js';


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/admins', adminRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/user', userRoutes); // ✅ Add this line



// Optional test route
app.get('/', (req, res) => {
  res.send('School Management System API running...');
});


export { app }