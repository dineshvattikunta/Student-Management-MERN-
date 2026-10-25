import { Department } from '../models/Department.js';
import { Student } from '../models/Student.js';
import { Course } from '../models/Course.js';

// @desc    Get all departments with calculated student counts and course counts
// @route   GET /api/departments
export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({}).sort({ name: 1 });

    // Aggregate student counts by department
    const studentCounts = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 }, avgGpa: { $avg: '$gpa' } } },
    ]);

    // Aggregate course counts by department
    const courseCounts = await Course.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
    ]);

    const studentMap = {};
    const avgGpaMap = {};
    studentCounts.forEach((sc) => {
      studentMap[sc._id] = sc.count;
      avgGpaMap[sc._id] = Number(sc.avgGpa.toFixed(2));
    });

    const courseMap = {};
    courseCounts.forEach((cc) => {
      courseMap[cc._id] = cc.count;
    });

    const enriched = departments.map((dept) => ({
      ...dept.toObject(),
      studentCount: studentMap[dept.name] || studentMap[dept.code] || 0,
      courseCount: courseMap[dept.name] || courseMap[dept.code] || 0,
      averageGpa: avgGpaMap[dept.name] || avgGpaMap[dept.code] || 3.4,
    }));

    res.json({
      success: true,
      data: enriched,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single department
// @route   GET /api/departments/:id
export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
};

// @desc    Create department
// @route   POST /api/departments
export const createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.json({
      success: true,
      message: 'Department updated successfully',
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.json({
      success: true,
      message: `Department ${department.name} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
