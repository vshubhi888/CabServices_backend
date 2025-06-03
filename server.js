const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Employee = require('./Employee.js');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/employee', async (req, res) => {
  console.log('GET /ud route called'); // Add this line
  // Create 20 employees
  const employees = [];
  for (let i = 1; i <= 20; i++) {
    employees.push({
      name: `Employee ${i}`,
      address: `Address ${i}, City, Country`,
      contactNumber: `+1-555-000${i.toString().padStart(2, '0')}`
    });
  }

  try {
    await Employee.deleteMany({});
    await Employee.insertMany(employees);
    console.log('Employees saved successfully:', employees); // This logs to the terminal
    res.send({ message: 'Employees saved to MongoDB' });
  } catch (err) {
    console.error('Error saving employees:', err);
    res.status(500).send({ error: 'Failed to save employees' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));