const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model and want to establish a relationship
        allowNull: true,
    },
    key: {
        type: String,
        allowNull: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
