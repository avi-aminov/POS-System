const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        allowNull: true,
    },
    fName: {
        type: String,
        allowNull: true,
    },
    lName: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    dateOfBirth: {
        type: String,
        allowNull: true,
    },
    address: {
        type: String,
        allowNull: true,
    },
    city: {
        type: String,
        allowNull: true,
    },
    zip: {
        type: String,
        allowNull: true,
    },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;