const axios = require('axios');
const MenuItem = require('../models/menuItem');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968';
const API_KEY = '<YOUR_JSON_BIN_API_KEY>'; // Replace with your JSONBin API key

// Fetch menu items
const getMenuItems = async (req, res) => {
    try {
        const response = await axios.get(JSON_BIN_URL, {
            headers: {
                'X-Master-Key': API_KEY,
            },
        });
        const menuItems = response.data.record.dishes;
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Error fetching menu' });
    }
};

// Place a new order
const placeOrder = async (req, res) => {
    const { items, total_price, table_number, contact_number } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items in the order' });
    }

    const newOrder = {
        total_price: total_price,
        status: 'placed',
        order_date: new Date(),
    };

    try {
        // Create a new order
        const order = await Order.create(newOrder);

        // Create order items
        for (const item of items) {
            await OrderItem.create({
                order_id: order.id,
                menu_item_id: item.menu_item_id,
                quantity: item.quantity,
                price: item.price,
            });
        }

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Error placing order' });
    }
};

// Fetch order history
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: OrderItem });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

module.exports = { getMenuItems, placeOrder, getOrders };
