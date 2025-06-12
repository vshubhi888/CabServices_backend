const express = require('express');
const router = express.Router();
const { registerCab } = require('../controllers/cabController');
const { authenticateToken, requireAdmin } = require('../security/jwt');

// Example: Get all cabs (implement your Cab model as needed)

router.post('/register', authenticateToken, requireAdmin, registerCab);

module.exports = router;