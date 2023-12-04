// In your Product model file (productModel.js)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        required: true,
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming you have a Category model and want to establish a relationship
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    price: {
        type: String,
        required: true,
    },
    newPrice: String,
    stock: {
        type: Number,
        required: true,
    },
    barcode: String,
    isDelete: Boolean,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
