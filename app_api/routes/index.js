const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const ctrlTrips= require('../controllers/trips');
const authController = require('../controllers/authentication');
const auth =  jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

/* GET home page. */
router
    .route('/trips')
    .get(ctrlTrips.tripList)
    .post(auth, ctrlTrips.tripAddTrip);


router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripFindByCode)
    .put(auth, ctrlTrips.tripUpdateTrip);

module.exports = router;
