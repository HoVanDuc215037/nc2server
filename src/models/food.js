const mongoose = require('mongoose');
//const commentSchema = require('./comment');
//const likeSchema = require('./like');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1000
    },
    image: {
        type: String, // This will hold the base64 encoded image
        default: null,
    }
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
