const orderServices = require('../services/orderServices');

exports.createOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await orderServices.createOrder(data);
    res.status(200).json(order);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const updatedOrder = await orderServices.updateOrderStatus(orderId);
    res.status(200).json(updatedOrder);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

exports.getPendingOrders = async (req, res) => {
  try {
    const ownerEmail = req.query.ownerEmail;
    const orders = await orderServices.getPendingOrders(ownerEmail);
    res.status(200).json(orders);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

exports.getDoneOrders = async (req, res) => {
  try {
    const ownerEmail = req.query.ownerEmail;
    const order = await orderServices.getDoneOrders(ownerEmail);
    res.status(200).json(order);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};