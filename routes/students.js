const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/:student_id', studentController.getStudentbyId);
router.post('/', studentController.createStudent);
router.put('/:student_id', studentController.updateStudent);
router.put('/:student_id/vaccinate', studentController.markStudentVaccinated);
router.delete('/:student_id', studentController.deleteStudent);

module.exports = router;
