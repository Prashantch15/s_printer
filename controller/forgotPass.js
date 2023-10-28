// controllers/userController.js
const UserFor = require('../models/forgotpassSch');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate and send a reset password email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserFor.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send reset password email
    const transporter = nodemailer.createTransport({
      // configure your email transporter here
    });

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You are receiving this because you (or someone else) requested the reset of your password.</p>
        <p>Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    });

    res.status(200).json({ message: 'Reset password instructions sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
