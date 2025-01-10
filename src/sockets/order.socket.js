let orders = []; // Shared in-memory storage for orders (can be refactored to use a database)

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for new order requests
    socket.on('new_request', (order) => {
      console.log('New order received:', order);

      if (!order.table || !order.customer_name || !order.customer_phone) {
        console.log("Order url does not containe table || customer name || customer phone");
        return socket.emit('error', { message: 'Invalid order data' });
      }

      // Save order
      orders.push(order);

      // Notify all connected clients
      io.emit('admin_got_new_request', order);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};