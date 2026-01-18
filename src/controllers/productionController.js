const productionService = require('../services/productionServices');

// Create a new production item (Admin only)
exports.createProduction = async (req, res) => {
  try {

    const production = await productionService.createProduction(req.body);
    res.status(200).json(production);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// Get all production items
exports.getAllProductions = async (req, res) => {
  try {
    const productions = await productionService.getAllProductions();
    res.status(200).json(productions);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// Get a production item by ID
exports.getProductionById = async (req, res) => {
  try {
    const production = await productionService.getProductionById(req.query.id);
    if (!production) {
      res.status(404).json({ message: 'Production not found' });
      return;
    }
    res.status(200).json(production);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

exports.getProductionByCreatedEmail = async (req, res) => {
  try {
    const production = await productionService.getProductionByCreatedEmail(req.query.email + "@gmail.com", req.query.page, req.query.pageSize);
    res.status(200).json(production);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// Update a production item (Admin only)
exports.updateProduction = async (req, res) => {
  try {
    const production = await productionService.updateProduction(req.query.id, req.body);
    res.status(200).json(production);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// Delete a production item (Admin only)
exports.deleteProduction = async (req, res) => {
  try {
    await productionService.deleteProduction(req.query.id);
    res.status(200).json({ message: 'Production deleted successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

exports.getProductionTags = async (req, res) => {
  const tags = productionService.productionTags();
  res.status(200).json({ tags: tags });
  return;
}