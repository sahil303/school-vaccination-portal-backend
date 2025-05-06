const pool = require('../db');

const getAllDrives = async () => {
  const result = await pool.query('SELECT * FROM vaccination_drives ORDER BY drive_date');
  return result.rows;
};

const createDrive = async (data) => {
  const { vaccine_name, drive_date, available_doses, applicable_classes } = data;
  const result = await pool.query(
    `INSERT INTO vaccination_drives (vaccine_name, drive_date, available_doses, applicable_classes)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [vaccine_name, drive_date, available_doses, applicable_classes]
  );
  return result.rows[0];
};

const updateDrive = async (id, data) => {
  const { vaccine_name, drive_date, available_doses, applicable_classes } = data;
  const result = await pool.query(
    `UPDATE vaccination_drives SET vaccine_name = $1, drive_date = $2, available_doses = $3, applicable_classes = $4
     WHERE id = $5 RETURNING *`,
    [vaccine_name, drive_date, available_doses, applicable_classes, id]
  );
  return result.rows[0];
};

const deleteDrive = async (id) => {
  await pool.query('DELETE FROM vaccination_drives WHERE id = $1', [id]);
};

const findDriveByDate = async (date) => {
  const result = await pool.query('SELECT * FROM vaccination_drives WHERE drive_date = $1', [date]);
  return result.rows;
};

module.exports = {
  getAllDrives,
  createDrive,
  updateDrive,
  deleteDrive,
  findDriveByDate
};
