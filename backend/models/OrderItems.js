const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItems = sequelize.define('OrderItems', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
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
		type: DataTypes.STRING,
		allowNull: true,
	},
	price: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	totalPrice: {
		type: DataTypes.STRING,
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
