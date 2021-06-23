const express = require('express');
const router = express.Router();
const ctrlTrips= require('../controllers/trips');

/* GET home page. */
router.get('/trips', ctrlTrips.tripList);
router.get('/trips/:tripCode', ctrlTrips.tripFindByCode);

module.exports = router;
