const adminServices = require("../services/adminServices");
const userServices = require('../services/userServices');
const bcrypt = require('bcrypt');

exports.createAccount = async (req, res) => {
    try {
        const accountExxist = await adminServices.getAccount(req.body.account.email);
        if (accountExxist != '') {
            res.status(200).json({ message: "Account with this email already exists", account: accountExxist });
            return;
        }
        const saltRounds = 3;
        const salt = bcrypt.genSaltSync(saltRounds);
        hashedPassword = bcrypt.hashSync('123', salt);
        let account = {
            createdBy: 'admin@gmail.com',
            username: req.body.account.email,
            avatar: defaultAvatar,
            role: 'owner',
            password: hashedPassword,
        }
        account = await ownerServices.createAccount(req.body.account.email);
        res.status(200).json(account);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const account = await adminServices.deleteAccount(req.body._id);
        res.status(200).json(account);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.getAllAccounts = async (req, res) => {
    try {
        const Account = await adminServices.getAllAccount()
        res.status(200).json(Account);
        return;
    } catch (error) {
        res.status(500).message(error.message);
    }
}

exports.updateAccounts = async (req, res) => { }

exports.getAccountByEmail = async (req, res) => {
    try {
        const account = await adminServices.getAccount(req.query.email + '@gmail.com');
        res.status(200).json(account);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.createAccount = async (req, res) => {
    try {
        const accountExxist = await userServices.checkExistAccount(req.body.account.email);
        if (accountExxist) {
            res.status(200).json({ message: "Account with this email already exists", result: false });
            return;
        }
        req.body.account.email = req.body.account.email + '@gmail.com';
        const account = await adminServices.createAccount(req.body.account);
        res.status(200).json({ account: account, result: true });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message, result: false });
        return;
    }
}