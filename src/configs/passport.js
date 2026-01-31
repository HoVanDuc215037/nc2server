const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const axios = require('axios');

const Account = require('../models/accountModel.js');

dotenv.config();

async function imageUrlToBase64(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    });

    const mimeType = response.headers['content-type'];
    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    return `data:${mimeType};base64,${base64}`;
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let account = await Account.findOne({ email: profile.emails[0].value }).select('-password');
                if (!account) {
                    const avatarBase64 = profile.photos?.length
                        ? await imageUrlToBase64(profile.photos[0].value)
                        : null;
                    let newAccount = await Account.create({
                        username: profile.emails[0].value.split('@')[0],
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        avatar: avatarBase64,
                        role: "owner",
                        createdBy: "admin@gmail.com",
                        haveRestaurant: false,
                        haveMap: false,
                    });
                    newAccount = newAccount.toObject();
                    return done(null, newAccount);
                };
                account = account.toObject();
                return done(null, account);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((account, done) => {
    done(null, account);
});
passport.deserializeUser((account, done) => {
    done(null, account);
});

module.exports = passport;
