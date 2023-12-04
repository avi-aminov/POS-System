const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        allowNull: true,
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Assuming you have an Order model and want to establish a relationship
        allowNull: false,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model and want to establish a relationship
        allowNull: true,
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Assuming you have a Customer model and want to establish a relationship
        allowNull: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
    },
    totalPrice: {
        type: String,
    },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
