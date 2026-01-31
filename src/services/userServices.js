const Account = require('../models/accountModel');
const Restaurant = require('../models/restaurantModel');
const bcrypt = require('bcrypt');

exports.getAccountDetailByEmail = async (email) => {
    try {
        const account = await Account.find({ email: email });
        return account;
    } catch (error) {
        throw new Error("Error getting account by email: ", error);
    }
}

exports.getProfile = async (email) => {
    try {
        const account = await Account.find({ email: email }, { password: 0, role: 0, haveMap: 0 });
        let ownerEmail = '';
        if (account[0].createdBy === 'admin@gmail.com') {
            ownerEmail = email;
        } else {
            ownerEmail = account[0].createdBy;
        }
        const restaurant = await Restaurant.find({ createdBy: ownerEmail }, { map: 0 });
        return { account: account, restaurant: restaurant };
    } catch (error) {
        throw new Error("Lỗi lấy profile: ", error);
    }
}

exports.updateProfile = async (email, data) => {
    try {
        const updatedAccount = await Account.findOneAndUpdate({ email: email }, { name: data.name, avatar: data.avatar });
        return updatedAccount;
    } catch (error) {
        throw new Error("Lỗi cập nhật profile: ", error);
    }
}

exports.signIn = async (username, password) => {
    try {
        const account = await Account.findOne({ username: username }).select('+password');
        if (!account) return null;
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) return null;
        return account;
    } catch (error) {
        throw new Error("Lỗi đăng nhập: ", error);
    }
}

exports.checkExistAccount = async (email) => {
    try {
        let account = {}; let accountCreated = {};
        account = await Account.findOne({ email: email });
        if (!account) accountCreated = await Account.findOne({ username: email });
        if (!accountCreated) return false;
        return true;
    } catch (error) {
        throw new Error('Lỗi kiểm tra tài khoản: ' + error.message);
        return false;
    }
}