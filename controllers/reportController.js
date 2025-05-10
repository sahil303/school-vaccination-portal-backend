const ReportModel = require('../models/reportModel');

const getReport = async (req, res) => {
  try {
    const filters = req.query;
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;

    const data = await ReportModel.getVaccinatedReports({ ...filters, page, limit });
    const total = await ReportModel.getReportCount(filters);

    res.json({ data, page, limit, total });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getReport };
