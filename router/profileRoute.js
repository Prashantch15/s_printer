const express = require('express');
const router = express.Router();
const userController = require('../controller/profileC');

router.get('/profile', userController.getProfile);
router.put('/update-profile', userController.updateProfile);
router.put('/change-password', userController.changePassword);

module.exports = router;
