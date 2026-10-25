import mongoose from 'mongoose';

const enrolledCourseSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true },
    courseTitle: { type: String, required: true },
    credits: { type: Number, default: 3 },
    grade: { type: String, default: 'A-' },
    attendanceRate: { type: Number, default: 94 }, // percentage
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      default: '+1 (555) 234-5678',
    },
    avatar: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    major: {
      type: String,
      required: [true, 'Major is required'],
      trim: true,
    },
    enrollmentYear: {
      type: Number,
      required: true,
      default: 2024,
      min: 2018,
      max: 2030,
    },
    semester: {
      type: String,
      default: 'Fall 2024',
    },
    academicLevel: {
      type: String,
      enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
      default: 'Sophomore',
    },
    gpa: {
      type: Number,
      required: true,
      default: 3.5,
      min: 0.0,
      max: 4.0,
    },
    creditsEarned: {
      type: Number,
      default: 45,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Graduated', 'Probation', 'Inactive'],
      default: 'Active',
    },
    enrolledCourses: {
      type: [enrolledCourseSchema],
      default: [],
    },
    emergencyContact: {
      name: { type: String, default: 'Jane Doe' },
      relationship: { type: String, default: 'Parent / Guardian' },
      phone: { type: String, default: '+1 (555) 987-6543' },
    },
    address: {
      city: { type: String, default: 'Boston, MA' },
      country: { type: String, default: 'United States' },
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Indexes for super-fast search and filtering
studentSchema.index({ firstName: 'text', lastName: 'text', email: 'text', studentId: 'text' });
studentSchema.index({ department: 1, status: 1, enrollmentYear: 1 });

export const Student = mongoose.model('Student', studentSchema);
