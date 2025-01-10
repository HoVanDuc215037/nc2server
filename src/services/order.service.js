const Order = require('../models/order');

// Method to create new food item
exports.createOrder = async (products) => {
  try {
    const newOrder = new Order(products);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};

exports.updateOrderStatus = async (orderId, newStatus) => {
  try {
    if (!['pending', 'done', 'rejected'].includes(newStatus)) {
      throw new Error('Invalid status value');
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true, runValidators: true } // Trả về document mới và kiểm tra validation
    );

    if (!updatedOrder) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return updatedOrder;
  } catch (error) {
    throw new Error(`Error updating order status: ${error.message}`);
  }
}

exports.getAllOrders = async () => {
  try {
    // Lấy danh sách đơn hàng, bao gồm thông tin món ăn (populate từ Food)
    const orders = await Order.find().populate('listFoodObject.foodId');
    return orders;
  } catch (error) {
    throw new Error('Không thể lấy danh sách đơn hàng: ' + error.message);
  }
};

exports.getOrderById = async (orderId) => {
  try {
    // Tìm đơn hàng theo ID, bao gồm thông tin món ăn (populate từ Food)
    const order = await Order.findById(orderId).populate('listFoodObject.foodId');
    return order;
  } catch (error) {
    throw new Error('Không thể lấy thông tin đơn hàng: ' + error.message);
  }
};