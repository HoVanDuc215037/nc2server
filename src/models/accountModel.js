const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, select: false },
    name: { type: String, required: false },
    role: { type: String, enum: ['admin', 'owner', 'staff'], default: 'owner' },
    avatar: { type: String, default: null },
    createdBy: { type: String, required: false },// The creator's email of this account
    haveRestaurant: { type: Boolean, default: false },
    haveMap: { type: Boolean, default: false },
}, { timestamps: false },
);

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;