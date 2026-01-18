const Restaurant = require('../models/restaurantModel');
const Account = require('../models/accountModel');

exports.createRestaurant = async (RestaurantData) => {
    try {
        const newRestaurant = new Restaurant(RestaurantData);
        const savedRestaurant = await newRestaurant.save();
        return savedRestaurant;
    } catch (error) {
        throw new Error('Failed to create Restaurant: ' + error.message);
    }
};

exports.updateMap = async (_id, map) => {
    try {
        const savedRestaurant = await Restaurant.findByIdAndUpdate(_id, { map: map });
        return savedRestaurant;
    } catch (error) {
        throw new Error('Failed to create Restaurant: ' + error.message);
    }
};
exports.updateRestaurant = async (_id, data) => {
    try {
        const savedRestaurant = await Restaurant.findByIdAndUpdate(_id, data);
        return savedRestaurant;
    } catch (error) {
        throw new Error('Failed to create Restaurant: ' + error.message);
    }
};
exports.setRestaurantExist = async (email) => {
    try {
        const account = await Account.findOneAndUpdate({ email: email }, { haveRestaurant: true });
        return account;
    } catch (error) {
        throw new Error('Failed to update Restaurant status: ' + error.message);
    }
};
exports.setMapExist = async (email) => {
    try {
        const account = await Account.findOneAndUpdate({ email: email }, { haveMap: true });
        return account;
    } catch (error) {
        throw new Error('Failed to update Map status: ' + error.message);
    }
};

exports.getRestaurantCreatedByEmail = async (email) => {
    try {
        const restaurant = await Restaurant.findOne({ createdBy: email });
        //console.log('restaurant: ', restaurant)
        return restaurant;
    } catch (error) {
        throw new Error('Failed to retrieve Map: ' + error.message);
    }
};