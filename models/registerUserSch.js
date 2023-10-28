const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  verificationCode: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const UserRegi = mongoose.model('UserRegi', userSchema);

module.exports = UserRegi;
