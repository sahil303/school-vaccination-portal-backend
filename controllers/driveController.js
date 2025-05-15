const DriveModel = require('../models/driveModel');

const isDateInPast = (date) => new Date(date) < new Date();
const isLessThan15Days = (date) => {
  const now = new Date();
  const d = new Date(date);
  return (d - now) / (1000 * 60 * 60 * 24) < 15;
};

const isCurrentDrive = (dateString) => {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate.getTime() === today.getTime();
}

const getAllDrives = async (req, res) => {
  try {
    const drives = await DriveModel.getAllDrives();
    res.json(drives);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const currentDrive = async (req, res) => {
  try {
    const drives = await DriveModel.getAllDrives();
    
    if(drives.length > 0)
    {
      const drive = drives.find(d => isCurrentDrive(d.drive_date));

      if(!drive)
      {
          return res.json( {message : "No drive scheduled for today"});
      }
      else{
        return res.json({data : drive});
      }
    }
    else{
          res.status(400).json({message : "No Drive Availabe"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createDrive = async (req, res) => {
  try {
    const { drive_date } = req.body;

    if (isLessThan15Days(drive_date)) {
      return res.status(400).json({ message: 'Drive must be scheduled at least 15 days in advance.' });
    }

    const existing = await DriveModel.findDriveByDate(drive_date);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Another drive already exists on this date.' });
    }

    const drive = await DriveModel.createDrive(req.body);
    res.status(201).json(drive);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateAvailableDoses = async (req, res) => {
  try {
    const { drive_date } = req.body;

    const updated = await DriveModel.updateDrive(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateDrive = async (req, res) => {
  try {
    const { drive_date } = req.body;

    if (isDateInPast(drive_date)) {
      return res.status(400).json({ message: 'Cannot update past drives.' });
    }

    if (isLessThan15Days(drive_date)) {
      return res.status(400).json({ message: 'Drive must be scheduled at least 15 days in advance.' });
    }

    const updated = await DriveModel.updateDrive(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const allDrives = await DriveModel.getAllDrives();
    const thisDrive = allDrives.find((d) => d.id == id);

    if (!thisDrive) {
      return res.status(404).json({ message: 'Drive not found' });
    }

    if (isDateInPast(thisDrive.drive_date)) {
      return res.status(400).json({ message: 'Cannot delete past drives.' });
    }

    await DriveModel.deleteDrive(id);
    res.json({ message: 'Drive deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllDrives,
  currentDrive,
  updateAvailableDoses,
  createDrive,
  updateDrive,
  deleteDrive
};
