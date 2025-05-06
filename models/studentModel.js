const pool = require('../db');

const getAllStudents = async (filters) => {
  const { name, student_class, vaccinated, page = 1, limit = 20 } = filters;
  let query = 'SELECT * FROM students';
  const conditions = [];
  const values = [];

  // filtering data
  if (name) {
    values.push(`%${name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }
  if (student_class) {
    values.push(`%${student_class}%`);
    conditions.push(`student_class ILIKE $${values.length}`);
  }
  if (vaccinated !== undefined) {
    values.push(vaccinated === 'true');
    conditions.push(`vaccinated = $${values.length}`);
  }

  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY id';

  // Pagination: OFFSET and LIMIT
  const offset = (parseInt(page) - 1) * parseInt(limit);
  values.push(limit);
  values.push(offset);
  query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const result = await pool.query(query, values);
  return result.rows;
};

const getStudentsCount = async (filters) => {
  let countQuery = 'SELECT COUNT(*) FROM students';
  const conditions = [];
  const values = [];

  if (filters.name) {
    values.push(`%${filters.name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }
  if (filters.student_class) {
    values.push(`%${filters.student_class}%`);
    conditions.push(`student_class ILIKE $${values.length}`);
  }
  if (filters.vaccinated !== undefined) {
    values.push(filters.vaccinated === 'true');
    conditions.push(`vaccinated = $${values.length}`);
  }

  if (conditions.length) {
    countQuery += ' WHERE ' + conditions.join(' AND ');
  }

  const result = await pool.query(countQuery, values);
  return parseInt(result.rows[0].count, 10);
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
