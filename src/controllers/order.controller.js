const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
  try {
    const { customer_name, customer_phone, tableId, listFoodObject } = req.body;

    // Kiểm tra đầu vào
    if (!customer_name || !customer_phone || !tableId || !listFoodObject) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin đơn hàng' });
    }

    const newOrder = await orderService.createOrder({
      customer_name,
      customer_phone,
      tableId,
      listFoodObject,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Kiểm tra đầu vào
    if (!status) {
      return res.status(400).json({ message: 'Vui lòng cung cấp trạng thái mới' });
    }

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
};