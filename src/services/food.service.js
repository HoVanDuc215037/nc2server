const Food = require('../models/food');

// Create a new food item
exports.createFood = async (foodData) => {
  try {
    const food = new Food(foodData);
    return await food.save();
  } catch (error) {
    throw new Error('Failed to create food: ' + error.message);
  }
};

// Get all food items
exports.getAllFoods = async () => {
  try {
    return await Food.find();
  } catch (error) {
    throw new Error('Failed to retrieve foods: ' + error.message);
  }
};

// Get a specific food item by ID
exports.getFoodById = async (foodId) => {
  try {
    return await Food.findById(foodId);
  } catch (error) {
    throw new Error('Failed to retrieve food: ' + error.message);
  }
};

// Update a food item
exports.updateFood = async (foodId, foodData) => {
  try {
    const food = await Food.findByIdAndUpdate(foodId, foodData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!food) {
      throw new Error('Food not found');
    }

    return food;
  } catch (error) {
    throw new Error('Failed to update food: ' + error.message);
  }
};

// Delete a food item
exports.deleteFood = async (foodId) => {
  try {
    const food = await Food.findByIdAndDelete(foodId);

    if (!food) {
      throw new Error('Food not found');
    }

    return food;
  } catch (error) {
    throw new Error('Failed to delete food: ' + error.message);
  }
};