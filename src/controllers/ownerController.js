const ownerServices = require("../services/ownerServices");

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

exports.createANewAccount = async (req, res) => { }

exports.deleteAnAccount = async (req, res) => { }

exports.getAccountCreatedByAOwner = async (req, res) => { }

exports.getStatistics = async (req, res) => { }