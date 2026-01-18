const mongoose = require('mongoose');

const permanent_orderSchema = new mongoose.Schema({
    restaurant_infor: {//restaurantId___tableId
        type: String,
        required: false,
        trim: true
    },
    customer_infor: {//name___phone
        type: String,
        required: false,
        trim: true
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
            },
            sale: {
                type: Number,
                default: 1
            }
        }
    ],
    totalPrice: { type: Number, required: false }
}, { timestamps: true });

const PermanentOrder = mongoose.model('PermanentOrder', permanent_orderSchema);
module.exports = PermanentOrder;