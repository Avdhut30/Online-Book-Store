// controllers/orderController.js
const Order = require('../models/order');

const OrderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate('user books');
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getOrderByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId }).populate('books');
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  placeOrder: async (req, res) => {
    try {
      const { user, books, totalAmount } = req.body;
      const newOrder = await Order.create({ user, books, totalAmount });
      return res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error placing order:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = OrderController;
