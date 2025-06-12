const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
    cabNumber: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    capacity: { type: Number, default: 4 },
    driver: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // New field for cab status
    createdAt: { type: Date, default: Date.now }, // Optional: track creation time
    updatedAt: { type: Date, default: Date.now }  // Optional: track update time
});

// Optional: update 'updatedAt' on save
cabSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Cab', cabSchema);