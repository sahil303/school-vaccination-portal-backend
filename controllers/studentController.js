const StudentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAllStudents(req.query);

    const total = await StudentModel.getStudentsCount(req.query);

    res.json({
      data: students,
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 20,
      total
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const validateVaccinationData = ({ vaccinated, vaccine_name, vaccination_date }) => {

  if (vaccinated === false && (vaccine_name || vaccination_date)) {
    throw new Error('Cannot specify vaccine_name or vaccination_date when vaccinated is false.');
  }
  if (vaccinated === true && (!vaccine_name || !vaccination_date)) {
    throw new Error('Must provide vaccine_name and vaccination_date when vaccinated is true.');
  }
};

const createStudent = async (req, res) => {
  try {
    
    const existingStudent = await StudentModel.findStudentById(req.body.student_id);
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this ID already exists.' });
    }

    if (req.body.vaccinated === true) {
      const existing = await StudentModel.findVaccinationByStudentIdAndVaccine(req.body.student_id, req.body.vaccine_name);
      if (existing.length > 0) {
        return res.status(400).json({ message: 'This student already has this vaccine recorded.' });
      }
    }

    // Validate vaccination logic
    validateVaccinationData(req.body);

    const student = await StudentModel.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    console.error(err);

    if (err.message.includes('vaccinated')) {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).send('Server error');
  }
};

const updateStudent = async (req, res) => {
  try {

    const existingStudent = await StudentModel.findStudentById(req.body.student_id);
    if (!existingStudent) {
      return res.status(400).json({ message: 'Student with this ID does not exists.' });
    }

    if (req.body.vaccinated === true) {
      const existing = await StudentModel.findVaccinationByStudentIdAndVaccine(req.body.student_id, req.body.vaccine_name);
      if (existing.length > 0) {
        return res.status(400).json({ message: 'This student already has this vaccine recorded.' });
      }
    }

    // Validate vaccination logic
    validateVaccinationData(req.body);

    const updated = await StudentModel.updateStudent(req.params.student_id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.message.includes('vaccinated')) {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).send('Server error');
  }
};

const deleteStudent = async (req, res) => {
  try {

    const existingStudent = await StudentModel.findStudentById(req.body.student_id);
    if (!existingStudent) {
      return res.status(400).json({ message: 'Student with this ID does not exists.' });
    }

    await StudentModel.deleteStudent(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
