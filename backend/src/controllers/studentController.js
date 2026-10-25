import { Student } from '../models/Student.js';

// @desc    Get all students with advanced search, filter, sort, and pagination
// @route   GET /api/students
export const getStudents = async (req, res, next) => {
  try {
    const {
      search,
      department,
      status,
      academicLevel,
      year,
      minGpa,
      maxGpa,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Text / regex search
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { studentId: regex },
        { email: regex },
        { major: regex },
        { department: regex },
      ];
    }

    // Exact filters
    if (department && department !== 'All') {
      query.department = department;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (academicLevel && academicLevel !== 'All') {
      query.academicLevel = academicLevel;
    }

    if (year && year !== 'All') {
      query.enrollmentYear = Number(year);
    }

    // Numeric GPA range
    if (minGpa || maxGpa) {
      query.gpa = {};
      if (minGpa) query.gpa.$gte = parseFloat(minGpa);
      if (maxGpa) query.gpa.$lte = parseFloat(maxGpa);
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10));
    const pageLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * pageLimit;

    // Sorting
    const sortObj = {};
    sortObj[sortBy] = order === 'asc' ? 1 : -1;

    const [total, students] = await Promise.all([
      Student.countDocuments(query),
      Student.find(query).sort(sortObj).skip(skip).limit(pageLimit),
    ]);

    const totalPages = Math.ceil(total / pageLimit) || 1;

    res.json({
      success: true,
      data: students,
      pagination: {
        total,
        page: pageNum,
        totalPages,
        limit: pageLimit,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new student
// @route   POST /api/students
export const createStudent = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // Auto-generate student ID if not provided
    if (!data.studentId || data.studentId.trim() === '') {
      const year = data.enrollmentYear || new Date().getFullYear();
      const count = await Student.countDocuments();
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      data.studentId = `STU-${year}-${String(count + 1).padStart(3, '0')}${randomSuffix}`;
    }

    // Set avatar if not provided
    if (!data.avatar || data.avatar.trim() === '') {
      data.avatar = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
        data.firstName + data.lastName
      )}`;
    }

    const newStudent = await Student.create(data);
    res.status(201).json({
      success: true,
      message: 'Student record created successfully',
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student by ID
// @route   PUT /api/students/:id
export const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    res.json({
      success: true,
      message: 'Student record updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student by ID
// @route   DELETE /api/students/:id
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    res.json({
      success: true,
      message: `Student ${student.firstName} ${student.lastName} (${student.studentId}) removed.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export students as CSV
// @route   GET /api/students/export/csv
export const exportStudentsCsv = async (req, res, next) => {
  try {
    const students = await Student.find({}).sort({ lastName: 1 });
    const headers = [
      'Student ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Department',
      'Major',
      'Academic Level',
      'Enrollment Year',
      'Semester',
      'GPA',
      'Credits Earned',
      'Status',
    ];

    const rows = students.map((s) => [
      s.studentId,
      `"${s.firstName}"`,
      `"${s.lastName}"`,
      s.email,
      `"${s.phone}"`,
      `"${s.department}"`,
      `"${s.major}"`,
      s.academicLevel,
      s.enrollmentYear,
      s.semester,
      s.gpa.toFixed(2),
      s.creditsEarned,
      s.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="campusos_students.csv"');
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};
