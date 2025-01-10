const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
        trim: true
    },
    customer_phone: {
        type: String,
        required: true,
        trim: true
    },
    tableId: {
        type: Number,
        required: true,
    },
    listFoodObject: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food', // Tham chiếu đến Food
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'done', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
