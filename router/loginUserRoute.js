// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userLogin');
//const {loginUser} =require("../controller/userLogin") 

router.post('/login', userController.loginUser);

module.exports = router;
