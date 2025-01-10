const foodService = require('../services/foodService');

// Create a new food item (Admin only)
exports.createFood = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const food = await foodService.createFood(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all food items
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a food item by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a food item (Admin only)
exports.updateFood = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const food = await foodService.updateFood(req.params.id, req.body);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a food item (Admin only)
exports.deleteFood = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    await foodService.deleteFood(req.params.id);
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};