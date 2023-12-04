const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        allowNull: true,
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Assuming you have a Customer model and want to establish a relationship
        allowNull: true,
    },
    subTotal: {
        type: String,
        required: true,
    },
    discount: String,
    tax: String,
    total: String,
    paymentMethod: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
