// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Get all orders
router.get('/', OrderController.getAllOrders);

// Get orders by user ID
router.get('/user/:userId', OrderController.getOrderByUser);

// Place a new order
router.post('/place-order', OrderController.placeOrder);

module.exports = router;
