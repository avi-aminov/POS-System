const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
