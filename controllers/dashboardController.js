// controllers/dashboardController.js
const pool = require('../db');

const getSummary = async (req, res) => {
  try {
    // Total students
    const totalResult = await pool.query('SELECT COUNT(*) FROM students');
    const total = parseInt(totalResult.rows[0].count);

    // Vaccinated students
    const vaccinatedResult = await pool.query('SELECT COUNT(*) FROM students WHERE vaccinated = true');
    const vaccinated = parseInt(vaccinatedResult.rows[0].count);

    // Percentage
    const percent = total === 0 ? 0 : Math.round((vaccinated / total) * 100);

    // Upcoming drives (within 30 days from today)
    const drivesResult = await pool.query(
      `SELECT * FROM vaccination_drives
       WHERE drive_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
       ORDER BY drive_date`
    );
    const upcomingDrives = drivesResult.rows;

    res.json({ total, vaccinated, percent, upcomingDrives });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getSummary };
