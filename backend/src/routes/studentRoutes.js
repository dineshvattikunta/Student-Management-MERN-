import express from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  exportStudentsCsv,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/export/csv', exportStudentsCsv);
router.route('/').get(getStudents).post(createStudent);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

export default router;
