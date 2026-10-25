import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      default: 3,
      min: 1,
      max: 6,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    term: {
      type: String,
      default: 'Fall 2024',
    },
    schedule: {
      type: String,
      default: 'Mon / Wed 10:00 - 11:30 AM',
    },
    capacity: {
      type: Number,
      default: 60,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Archived', 'Upcoming'],
      default: 'Active',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model('Course', courseSchema);
