const pool = require('../db');

const getTotalStudents = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM students');
  return parseInt(result.rows[0].count);
};

const getVaccinatedStudents = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM students WHERE vaccinated = true');
  return parseInt(result.rows[0].count);
};

const getUpcomingDrives = async () => {
  const result = await pool.query(
    `SELECT * FROM vaccination_drives
     WHERE drive_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
     ORDER BY drive_date`
  );
  return result.rows;
};

module.exports = {
  getTotalStudents,
  getVaccinatedStudents,
  getUpcomingDrives
};
