const express = require('express');
const router = express.Router();

// Example: Get all cabs (implement your Cab model as needed)
router.get('/', async (req, res) => {
  res.json({ message: 'Get all cabs (implement logic)' });
});

module.exports = router;