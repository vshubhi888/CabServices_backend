const express = require('express');
const Booking = require('../modals/booking');
const router = express.Router();

// Example: Get all bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('employee driver');
  res.json(bookings);
});

module.exports = router;