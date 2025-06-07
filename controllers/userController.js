const User = require('../modals/user');

/**
 * Registers a new user.
 * 
 * @param {Object} req - Express request object (expects name, email, password, role, phone in body)
 * @param {Object} res - Express response object
 * @returns {Object} JSON with message and user data, or error
 */
async function registerUser(req, res) {
    try {
        const { name, email, password, role, phone } = req.body;
        const user = new User({ name, email, password, role, phone });
        await user.save();
        if(user.role === 'driver') {
            res.status(201).json({ message: "Driver Registered", user });
        } else {
            res.status(201).json({ message: "User Registered", user });
        }
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}; 

/**
 * Logs in a user by verifying email and password.
 * 
 * @param {Object} req - Express request object (expects email and password in body)
 * @param {Object} res - Express response object
 * @returns {Object} JSON with message and user data if successful, or error
 */
async function loginUser(req, res) {
    try {   
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await user.comparePassword(password)) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}

/**
 * Gets the user profile (example placeholder).
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with message
 */
async function getUserProfile(req, res) {
    try {git
        const { name, email } = req.body;
        const user = await User.findOne({ name, email }, '-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User Profile" , user});

    } catch (error) {
        return res.status(500).json({ message: "Error fetching user profile", error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
