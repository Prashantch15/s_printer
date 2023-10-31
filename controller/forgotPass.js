// controllers/userController.js
const uuserFor = require('../models/forgotpassSch');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate and send a reset password email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userr = await uuserFor.findOne({ email });

    if (!userr) {
      return res.status(404).json({ message: 'Userr not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    userr.resetToken = resetToken;
    userr.resetTokenExpiration = resetTokenExpiration;
    await userr.save();

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
