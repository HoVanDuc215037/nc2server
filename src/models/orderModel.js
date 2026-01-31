const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    owner_email: { type: String },
    customer_infor: {
        type: String
    },
    productions: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
            },
            name: {
                type: String,
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
                required: false,
                min: 1,
            }
        }
    ],
    table: { type: Number },
    status: { type: String, enum: ['pending', 'done', 'rejected'], default: 'pending' },
    totalPrice: { type: Number, required: false }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
