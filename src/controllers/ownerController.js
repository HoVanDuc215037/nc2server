const ownerServices = require("../services/ownerServices");
const userServices = require("../services/userServices");

exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = await ownerServices.createRestaurant(req.body.restaurant);
        const status = await ownerServices.setRestaurantExist(req.body.email);
        res.status(200).json({ restaurant: restaurant, status: status });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.udpateRestaurant = async (req, res) => {
    try {
        const restaurant = await ownerServices.updateRestaurant(req.body._id, req.body.data);
        res.status(200).json(restaurant);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.getRestaurant = async (req, res) => {
    try {
        const restaurant = await ownerServices.getRestaurantCreatedByEmail(req.query.email);
        res.status(200).json(restaurant);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.updateMap = async (req, res) => {
    try {
        const restaurant = await ownerServices.updateMap(req.body._id, req.body.map);
        const status = await ownerServices.setMapExist(req.body.email);
        res.status(200).json({ map: restaurant.map, status: status });
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
        const account = await ownerServices.createAccount(req.body.account);
        res.status(200).json({ account: account, result: true });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message, result: false });
        return;
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const account = await ownerServices.deleteAccount(req.body._id);
        res.status(200).json(account);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.getAccountCreatedByAOwner = async (req, res) => {
    try {
        const account = await ownerServices.getAccountCreatedByAOwner(req.query.ownerEmail + '@gmail.com');
        res.status(200).json(account);
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

exports.getStatistics = async (req, res) => { }