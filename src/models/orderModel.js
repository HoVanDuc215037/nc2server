const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    owner_email: { type: String },//=restaurant room
    customer_infor: {//name___phone
        type: String
    },
    productions: [
        {
            productionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
                min: 1,
            }
        }
    ],
    status: { type: String, enum: ['pending', 'done', 'rejected'], default: 'pending' },
    totalPrice: { type: Number, required: false }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
