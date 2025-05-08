const DashboardModel = require('../models/dashboardModel');

const getSummary = async (req, res) => {
  try {
    const total = await DashboardModel.getTotalStudents();
    const vaccinated = await DashboardModel.getVaccinatedStudents();
    const drives = await DashboardModel.getUpcomingDrives();

    const percent = total === 0 ? 0 : Math.round((vaccinated / total) * 100);
    res.json({ total, vaccinated, percent, upcomingDrives: drives });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getSummary };
