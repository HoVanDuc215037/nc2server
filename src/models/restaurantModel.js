const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, require: false },
    createdBy: { type: String, require: false }, //The owner's email
    image: { type: String, default: null },
    textLocation: { type: String, required: false },
    map: {
        floors: [{ type: Number }],
        items: [{
            id: { type: String },
            type: { type: String },
            floor: { type: Number },
            x: { type: Number },
            y: { type: Number },
            meta: { type: Object },
        }]
    }
}, { timestamps: false });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;