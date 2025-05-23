// routes/drives.js
const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');

router.get('/', driveController.getAllDrives);
router.post('/', driveController.createDrive);
router.put('/:id', driveController.updateDrive);
router.put('/availableDoses/:id', driveController.updateAvailableDoses);
router.delete('/:id', driveController.deleteDrive);
router.get('/current', driveController.currentDrive);

module.exports = router;
