import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Department code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    headOfDepartment: {
      type: String,
      required: [true, 'Department head is required'],
      trim: true,
    },
    email: {
      type: String,
      default: '',
    },
    officeLocation: {
      type: String,
      default: 'Main Science Hall, 3rd Floor',
    },
    facultyCount: {
      type: Number,
      default: 12,
      min: 0,
    },
    accentColor: {
      type: String,
      default: '#6366F1',
    },
  },
  {
    timestamps: true,
  }
);

export const Department = mongoose.model('Department', departmentSchema);
