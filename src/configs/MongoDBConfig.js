const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
    const queryString = process.env.MONGODB_URI;
    mongoose.connect(queryString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected!'))
        .catch(err => console.log('MongoDB connection error:', err.message));
}
