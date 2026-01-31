const Account = require('../models/accountModel');

exports.createAccount = async (accountData) => {
    try {
        const newAccount = new Account(accountData);
        const savedAccount = await newAccount.save();
        return savedAccount;
    } catch (error) {
        throw new Error('Fail owner create account: ' + error.message);
    }
}

exports.deleteAccount = async (accountID) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(accountID);
        return deletedAccount;
    } catch (error) {
        throw new Error('Fail owner delete account: ' + error.message);
    }
}

exports.getAccount = async (email) => {
    try {
        let account = {}; let accountCreated = {};
        account = await Account.findOne({ email: email });
        if (!account) accountCreated = await Account.findOne({ username: email });
        return { account, accountCreated };
    } catch (error) {
        throw new Error('Lỗi lấy tài khoản: ' + error.message);
    }
}
exports.getAllAccount = async () => {
    try {
        const Owners = await Account.find({ role: 'owner' });
        const Staffs = await Account.find({ role: 'staff' });
        return { Owners: Owners, Staffs: Staffs };
    } catch (error) {
        throw new Error('Fail admin get all accounts: ' + error.message);
    }
}