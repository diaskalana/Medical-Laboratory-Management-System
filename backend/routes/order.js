const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import the Order model

// Create a new Order
router.post('/add', async (req, res) => {
    try {
        // Extract data from the request body
        const { date, company, destination, items, status } = req.body;

        // Create a new Order instance
        const newOrder = new Order({ date, company, destination, items, status });

        // Save the new Order to the database
        await newOrder.save();

        // Respond with a success message
        res.json('Order added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all Orders
router.get('/', async (req, res) => {
    try {
        // Retrieve all Orders from the database
        const orders = await Order.find();

        // Respond with the list of Orders
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an Order by ID
router.put('/update/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { date, company, destination, items, status } = req.body;

        // Create an object with the updated Order data
        const updatedOrder = { date, company, destination, items, status };

        // Find and update the Order in the database
        const result = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });

        // Check if the Order was found and updated
        if (!result) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Respond with a success message and the updated Order
        res.json({ status: 'Order Updated', order: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete an Order by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find and delete the Order from the database
        const deletedOrder = await Order.findByIdAndRemove(orderId);

        // Check if the Order was found and deleted
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Respond with a success message and the deleted Order
        res.json({ status: 'Order Deleted', order: deletedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get an Order by ID
router.get('/get/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the Order by ID in the database
        const order = await Order.findById(orderId);

        // Check if the Order was found
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Respond with the retrieved Order
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
