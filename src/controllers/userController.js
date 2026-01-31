const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.signIn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  //console.log(req.body);
  try {
    const user = await userServices.signIn(username, password);
    if (!user) { res.status(401).json({ message: "Không đúng password hoặc username", account: null }); return; }
    const token = jwt.sign({ user: { email: user.email, name: user.name, role: user.role, haveMap: user.haveMap, haveRestaurant: user.haveRestaurant, createdBy: user.createdBy } }, SECRET_KEY, { expiresIn: '24h' });
    res.status(200).json({ token: token });//256
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }
    const user = await userServices.signUp(username, password);
    if (!user) {
      return res.status(409).json({ message: "Username đã tồn tại" });
    }
    const token = jwt.sign(
      {
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
          haveMap: false,
          haveRestaurant: false,
        },
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message: "Đăng ký thành công",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAccountInformation = async (req, res) => {
  try {
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
    res.status(200).json({ data: profile });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

exports.getHashedText = async (req, res) => {
  const saltRounds = 3;
  const salt = bcrypt.genSaltSync(saltRounds);
  hashedText = bcrypt.hashSync(req.query.text, salt);
  res.status(200).json({ data: hashedText });
  return;
}

exports.checkExistAccount = async (req, res) => {
  try {
    const exist = await userServices.checkExistAccount(req.query.email + '@gmail.com');
    res.status(200).json({ exist: exist });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}