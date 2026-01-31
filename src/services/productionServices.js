const Production = require('../models/productionModel');

exports.createProduction = async (productionData) => {
  try {
    const newProduction = new Production(productionData);
    const savedProduction = await newProduction.save();
    return savedProduction;
  } catch (error) {
    throw new Error('Failed to create production: ' + error.message);
  }
};

exports.getAllProductions = async () => {
  try {
    return await Production.find();
  } catch (error) {
    throw new Error('Failed to retrieve productions: ' + error.message);
  }
};

exports.getProductionById = async (productionId) => {
  try {
    return await Production.findById(productionId);
  } catch (error) {
    throw new Error('Failed to retrieve production: ' + error.message);
  }
};

exports.getProductionByCreatedEmail = async (email) => {
  try {
    return await Production.find({ createdBy: email });
  } catch (error) {
    throw new Error('Failed to retrieve production: ' + error.message);
  }
};

exports.updateProduction = async (productionId, productionData) => {
  try {
    const production = await Production.findByIdAndUpdate(productionId, productionData);
    return production;
  } catch (error) {
    throw new Error('Failed to update production: ' + error.message);
  }
};

exports.deleteProduction = async (productionId) => {
  try {
    const production = await Production.findByIdAndDelete(productionId);
    return production;
  } catch (error) {
    throw new Error('Failed to delete production: ' + error.message);
  }
};

exports.productionTags = () => {
  return ["Đồ ăn", "Đồ uống", "Mỳ, bún", "Đồ ăn vặt", "Tươi sống", "Chả", "Chiên", "Luộc", "Thức ăn nhanh", "Đồ ngọt", "Trà", "Cà phê", "Có cồn", "Chay"];
}