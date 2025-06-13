const express = require('express');
const router = express.Router();
const { registerCab , getAllCabs} = require('../controllers/cabController');
const { authenticateToken, requireAdmin } = require('../security/jwt');

// Example: Get all cabs (implement your Cab model as needed)

router.post('/register', authenticateToken, requireAdmin, registerCab);
router.post('/fetchCabs', authenticateToken, requireAdmin, getAllCabs);

module.exports = router;