const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res) => {
  //google
  const { username, password } = req.body;
  //console.log(req.body);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  res.json({ message: 'Login successful', token });
};

exports.signup = async (req, res) => { }

exports.verifyToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.json({ username: decoded.username, role: decoded.role });
  });
};

exports.getAccountInformation = async (req, res) => {
  try {
    //console.log(req);
    const account = await userServices.getAccountDetailByEmail(req.query.email + '@gmail.com');
    res.status(200).json({ account });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

exports.getProfile = async (req, res) => {
  try {
    const profile = await userServices.getProfile(req.query.email + '@gmail.com');
    res.status(200).json(profile);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const profile = await userServices.updateProfile(req.body.email + '@gmail.com', req.body.data);
    res.status(200).json(profile);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

exports.createANewAccount = async (req, res) => { }

exports.deleteAnAccount = async (req, res) => { }

exports.getAllAccounts = async (req, res) => { }

exports.getAccountCreatedByAOwner = async (req, res) => { }

exports.getStatistics = async (req, res) => { }
