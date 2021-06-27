const express = require('express');
const { put } = require('request');
const router = express.Router();
const ctrlTrips= require('../controllers/trips');

/* GET home page. */
router
    .route('/trips')
    .get(ctrlTrips.tripList)
    .post(ctrlTrips.tripAddTrip);


router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripFindByCode)
    .put(ctrlTrips.tripUpdateTrip);

module.exports = router;
