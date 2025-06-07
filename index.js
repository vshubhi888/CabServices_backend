const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./modals/user');
const userRoutes = require('./routes/userRoutes'); // Assuming you have a userRoute file
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // <-- Add this line

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users',userRoutes);
app.use('/api/cab',userRoutes);
app.use('/api/location',userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));