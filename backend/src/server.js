import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seedData.js';
import { errorHandler } from './middleware/errorHandler.js';

import studentRoutes from './routes/studentRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { Department } from './models/Department.js';
import { Course } from './models/Course.js';
import { Student } from './models/Student.js';
import { initialDepartments, initialCourses, initialStudents } from './seed/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check & System info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'CampusOS Engine',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Demo Re-seed endpoint
app.post('/api/system/reset-demo', async (req, res, next) => {
  try {
    await Department.deleteMany({});
    await Course.deleteMany({});
    await Student.deleteMany({});

    await Department.insertMany(initialDepartments);
    await Course.insertMany(initialCourses);
    await Student.insertMany(initialStudents);

    res.json({
      success: true,
      message: 'Demo dataset reset to pristine Framer showcase state.',
    });
  } catch (error) {
    next(error);
  }
});

// Mount Routes
app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    const server = app.listen(PORT, () => {
      console.log(`⚡ CampusOS API running on port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
    });

    return server;
  } catch (err) {
    console.error('Fatal initialization error:', err);
    process.exit(1);
  }
};

startServer();

export default app;
