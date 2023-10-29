// const express = require('express');
// const router = express.Router();
// //const User = require('../models/User');
// const nodemailer = require('nodemailer');
// const randomstring = require('randomstring');
// const UserRegi =require("../models/registerUserSch");
// // Register a new user
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if the email is already registered
//     const existingUser = await UserRegi.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Generate a verification code (OTP)
//     const verificationCode = randomstring.generate(6);

//     // Create a new user
//     const newUser = new UserRegi({
//       name,
//       email,
//       password, // You should hash and salt the password
//       verificationCode,
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send verification email
//     sendVerificationEmail(email, verificationCode);

//     res.status(201).json({ message: 'User registered. Check your email for verification.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Verify email by OTP
// router.post('/verify-email', async (req, res) => {
//   try {
//     const { email, verificationCode } = req.body;

//     // Find the user by email and verification code
//     const user = await UserRegi.findOne({ email, verificationCode });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid verification code or email' });
//     }

//     // Update user status to 'verified'
//     user.isVerified = true;
//     await user.save();

//     res.status(200).json({ message: 'Email verified successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Helper function to send verification email
// function sendVerificationEmail(email, verificationCode) {
//   const transporter = nodemailer.createTransport({
//     // Configure your email transport here (SMTP, email provider, etc.)
//     service: 'Gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Email Verification',
//     text: `Your verification code is: ${verificationCode}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }

// module.exports = router;
const express = require('express');
const router = express.Router();
const UserRegi = require("../models/registerUserSch");

// Register a new user without OTP
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await UserRegi.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const newUser = new UserRegi({
      name,
      email,
      password, // You should hash and salt the password
      isVerified: true, // Mark the user as verified
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login without OTP
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and password (you should implement password validation)
    const user = await UserRegi.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // You should validate the password here and compare it with the stored hashed password

    // Check if the user is verified (you may want to handle this differently in your implementation)
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Email not verified' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
