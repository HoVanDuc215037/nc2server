const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    }),
    (req, res) => {
        const token = jwt.sign({ user: { email: req.user.email, name: req.user.name, role: req.user.role, haveMap: req.user.haveMap, haveRestaurant: req.user.haveRestaurant } }, SECRET_KEY, { expiresIn: '24h' });
        res.redirect(`http://localhost:8080/login-success?e078cb80a315c1545d5396567810bf94dc360f30bfdaae14ca6aad6cf9fe768d=${token}`);//256
    }
);

module.exports = router;