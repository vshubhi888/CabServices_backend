const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true }
});

// Explicitly set the collection name to 'employee'
module.exports = mongoose.model('Employee', employeeSchema, 'employee');