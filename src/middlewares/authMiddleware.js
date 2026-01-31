const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
  const token = req.headers['Authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = decoded;
    next();
  });
};

exports.hashPassword = async (req, res, next) => {
  req.body.account.password = await bcrypt.hash(req.body.account.password, 10);
  next();
}