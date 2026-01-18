const Account = require('../models/accountModel');
const Restaurant = require('../models/restaurantModel');

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
        const updatedAccount = await Account.findOneAndUpdate({ email: email }, { name: data.name, image: data.image });
        return updatedAccount;
    } catch (error) {
        throw new Error("Lỗi cập nhật profile: ", error);
    }
}