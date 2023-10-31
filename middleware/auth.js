const jwt = require('jsonwebtoken');
const  secretKey  = "zImdHqCDwU" // Create a config.js with your secretKey

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
