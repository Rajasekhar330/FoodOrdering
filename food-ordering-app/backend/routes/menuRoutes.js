const express = require('express');
const router = express.Router();
const { getMenuItems, placeOrder, getOrders } = require('../controllers/menuController');

// Get all menu items
router.get('/menu', getMenuItems);

// Place a new order
router.post('/order', placeOrder);

// Get order history
router.get('/orders', getOrders);

module.exports = router;
