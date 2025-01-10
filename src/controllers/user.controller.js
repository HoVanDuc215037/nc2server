const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Mock user data (replace with database queries in production)
const users = [
  { username: 'admin', password: 'duc', role: 'admin' },
  { username: 'staff', password: 'duc', role: 'staff' },
];

// Login handler
exports.login = (req, res) => {
  const { username, password } = req.body;
  //console.log(req);

  // Validate username and password
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  // Send token in response
  res.json({ message: 'Login successful', token });
};

// Verify token handler
exports.verifyToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json({ username: decoded.username, role: decoded.role });
  });
};
