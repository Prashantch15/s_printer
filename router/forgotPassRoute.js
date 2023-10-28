// routes/userRoutes.js
const express = require('express');
const userController = require('../controller/forgotPass');

const router = express.Router();
router.post('/forgot-password', userController.forgotPassword);
// router.post('/send-otp', userController.sendOTP);

module.exports = router;
