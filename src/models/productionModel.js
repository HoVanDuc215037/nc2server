const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    description: { type: String },
    price: {
        type: Number,
        required: false,
        min: 1
    },
    image: {
        type: String,
        default: null,
    },
    tags: {
        type: [String],
    },
    createdBy: { type: String, required: false }
}, { timestamps: true },
);

const Production = mongoose.model('Production', productionSchema);
module.exports = Production;
