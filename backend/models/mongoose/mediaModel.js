const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        allowNull: true,
    },
    path: {
        type: String,
        allowNull: true,
    },
    size: {
        type: Number,
        allowNull: true,
    },
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
