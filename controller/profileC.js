const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const UserPro = require('../models/profile');

const getProfile = async (req, res) => {
  try {
    // Check if the user is authenticated (you should implement this middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve the user's profile based on their JWT token
    const user = await UserPro.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's profile data
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Check if the user is authenticated (you should implement this middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get the user's ID from the JWT token
    const userId = req.user.id;

    // Check if the request body contains valid data (you should implement validation)
    const { username, email } = req.body;

    // Update the user's profile data
    await User.findByIdAndUpdate(userId, { username, email });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const changePassword = async (req, res) => {
  try {
    // Check if the user is authenticated (you should implement this middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get the user's ID from the JWT token
    const userId = req.user.id;

    // Check if the request body contains valid data (you should implement validation)
    const { currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
