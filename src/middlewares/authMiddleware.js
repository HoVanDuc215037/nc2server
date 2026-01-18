const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  //console.log(req.headers);
  const token = req.headers['Authorization']?.split(' ')[1]; // Extract token from Bearer

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = decoded; // Attach decoded user information to the request object
    next();
  });
};