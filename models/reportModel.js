const pool = require('../db');

const getVaccinatedReports = async ({ vaccine_name, student_class, page = 1, limit = 20 }) => {
  const conditions = ['vaccinated = true'];
  const values = [];

  if (vaccine_name) {
    values.push(`%${vaccine_name}%`);
    conditions.push(`vaccine_name ILIKE $${values.length}`);
  }
  if (student_class) {
    values.push(`%${student_class}%`);
    conditions.push(`student_class ILIKE $${values.length}`);
  }

  let query = 'SELECT * FROM students WHERE ' + conditions.join(' AND ');
  const offset = (parseInt(page) - 1) * parseInt(limit);
  values.push(limit, offset);
  query += ` ORDER BY vaccination_date DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const result = await pool.query(query, values);
  return result.rows;
};

const getReportCount = async ({ vaccine_name, student_class }) => {
  const conditions = ['vaccinated = true'];
  const values = [];

  if (vaccine_name) {
    values.push(`%${vaccine_name}%`);
    conditions.push(`vaccine_name ILIKE $${values.length}`);
  }
  if (student_class) {
    values.push(`%${student_class}%`);
    conditions.push(`student_class ILIKE $${values.length}`);
  }

  const query = 'SELECT COUNT(*) FROM students WHERE ' + conditions.join(' AND ');
  const result = await pool.query(query, values);
  return parseInt(result.rows[0].count);
};

module.exports = {
  getVaccinatedReports,
  getReportCount
};
