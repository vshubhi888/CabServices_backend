const express = require('express');
const Booking = require('../modals/booking');
const router = express.Router();
const { registerBooking, updateBooking } = require('../controllers/bookingController');

// Example: Get all bookings
router.post('/register',registerBooking)
router.post('/update',updateBooking)

module.exports = router;