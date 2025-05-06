const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.put('/:student_id', studentController.updateStudent);
router.delete('/:student_id', studentController.deleteStudent);

module.exports = router;
