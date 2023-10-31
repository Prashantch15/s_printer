const User = require('../models/registerUserSch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../middleware/auth'); 

const userController = {
  register: async (req, res) => {
    try {
      const requiredField = {
        password,
        
        email,
        username,
      } = req.body;

      const userExists = await User.findOne({ $or: [{ email }, { username }] });

      if (userExists) {
        return res.status(400).json({ message: 'Email or username already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const CreateUser = new User({
        
        email: email,
        username : username,
        password: hashedPassword,
      });

      await CreateUser.save();

      res.status(201).json({ message: 'User registered.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ username: user.username, email: user.email }, secretKey, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserDetails: async (req, res) => {
    try {
      const { username, email } = req.user;
      res.status(200).json({ username, email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
