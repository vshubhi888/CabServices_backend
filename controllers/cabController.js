const Cab = require('../modals/cab');

/**
 * Registers a new cab.
 */
async function registerCab(req, res) {
  try {
    const { cabNumber, model, capacity, driver } = req.body;

    // Check if cab already exists
    const existingCab = await Cab.findOne({ cabNumber });
    if (existingCab) {
      return res.status(400).json({ message: "Cab number already registered" });
    }

    const cab = new Cab({ cabNumber, model, capacity, driver });
    await cab.save();

    res.status(201).json({ message: "Cab registered successfully", cab });
  } catch (error) {
    console.error('Cab register error:', error);
    res.status(500).json({ message: "Error registering cab", error });
  }
}

module.exports = {
  registerCab
};