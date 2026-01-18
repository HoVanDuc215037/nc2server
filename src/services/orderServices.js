const Order = require('../models/orderModel');

// Method to create new food item
exports.createOrder = async (order) => {
  try {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(`Lỗi tạo đơn hàng: ${error.message}`);
  }
};

exports.updateOrderStatus = async (orderId, newStatus) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus });
    return updatedOrder;
  } catch (error) {
    throw new Error(`Lỗi cập nhật đơn hàng: ${error.message}`);
  }
}

exports.getPendingOrders = async (email) => {
  try {
    const pendingOrders = await Order.find({ where: { owner_email: email, status: 'pending' } });
    return pendingOrders;
  } catch (error) {
    throw new Error('Không thể lấy danh sách đơn hàng đang chờ: ' + error.message);
  }
};

exports.getDoneOrders = async (email) => {
  try {
    const pendingOrders = await Order.find({ where: { owner_email: email, status: 'done' } });
    return pendingOrders;
  } catch (error) {
    throw new Error('Không thể lấy danh sách đơn hàng đã hoàn thành: ' + error.message);
  }
};

exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw new Error('Không thể lấy thông tin đơn hàng: ' + error.message);
  }
};