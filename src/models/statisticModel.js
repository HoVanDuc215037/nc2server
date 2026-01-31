const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    owner_email: { type: String },
    total_orders: { type: Number, default: 0 },
    total_revenue: { type: Number, default: 0 },
}, { timestamps: true });

const Statistic = mongoose.model('Statistic', statisticSchema);
module.exports = Statistic;