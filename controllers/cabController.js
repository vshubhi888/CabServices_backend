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

/**
 * Fetches all cabs.
 */
async function getAllCabs(req, res) {
  try {
    const { role } = req.body;
    const filter = role ? { role } : {};
    const cabs = await Cab.find(filter);
    res.status(200).json({ cabs });
  } catch (error) {
    console.error('Fetch cabs error:', error);
    res.status(500).json({ message: "Error fetching cabs", error });
  }
}


module.exports = {
  registerCab, getAllCabs
};