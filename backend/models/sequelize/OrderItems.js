const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItems = sequelize.define('orderItems', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	userID: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	orderID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	productID: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	customerID: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	price: {
		type: DataTypes.STRING(8),
		allowNull: false,
	},
	quantity: {
		type: DataTypes.STRING(3),
		allowNull: true,
	},
	totalPrice: {
		type: DataTypes.STRING(8),
		allowNull: true,
	},
});

OrderItems.sync({ force: true })
	.then(() => {
		console.log('OrderItems model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize OrderItems model:', error);
	});

module.exports = OrderItems;
