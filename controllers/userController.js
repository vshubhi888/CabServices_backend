const User = require('../modals/user');

/**
 * Registers a new user.
 */
async function registerUser(req, res) {
    try {
        const { name, email, password, role, phone } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const user = new User({ name, email, password, role, phone });
        await user.save();
        if (role === 'driver') {
            res.status(201).json({ message: "Driver Registered", user });
        } else {
            res.status(201).json({ message: "User Registered", user });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: "Error registering user", error });
    }
}

/**
 * Logs in a user by verifying email and password.
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}

/**
 * Gets the user profile.
 */
async function getUserProfile(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User Profile", user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user profile", error });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
