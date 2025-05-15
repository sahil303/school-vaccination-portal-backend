const pool = require('../db');

const getAllStudents = async () => {
  let query = 'SELECT * FROM students';

  query += ' ORDER BY student_id';

  const result = await pool.query(query);
  return result.rows;
};

const getStudentsCount = async () => {
  let countQuery = 'SELECT COUNT(*) FROM students';

  const result = await pool.query(countQuery);
  return parseInt(result.rows[0].count);
};

const createStudent = async (data) => {
  const { student_id, name, student_class, vaccinated, vaccine_name, vaccination_date } = data;

  const result = await pool.query(
    `INSERT INTO students (student_id, name, student_class, vaccinated, vaccine_name, vaccination_date)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [student_id, name, student_class, vaccinated, vaccine_name, vaccination_date]
  );
  return result.rows[0];
};

const updateStudent = async (id, data) => {
  const {student_id, name, student_class, vaccinated, vaccine_name, vaccination_date } = data;
  const result = await pool.query(
    `UPDATE students SET name = $1, student_class = $2, vaccinated = $3, vaccine_name = $4, vaccination_date = $5
     WHERE student_id = $6 RETURNING *`,
    [name, student_class, vaccinated, vaccine_name, vaccination_date, id]
  );
  return result.rows[0];
};

const findVaccinationByStudentIdAndVaccine = async (student_id, vaccine_name) => {
  const result = await pool.query(
    'SELECT * FROM students WHERE student_id = $1 AND vaccine_name = $2',
    [student_id, vaccine_name]
  );
  return result.rows;
};

const findStudentById = async (student_id) => {
  const result = await pool.query(
    'SELECT * FROM students WHERE student_id = $1',
    [student_id]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  await pool.query('DELETE FROM students WHERE student_id = $1', [id]);
};


module.exports = {
  getAllStudents,
  getStudentsCount,
  createStudent,
  updateStudent,
  findStudentById,
  findVaccinationByStudentIdAndVaccine,
  deleteStudent,
};
