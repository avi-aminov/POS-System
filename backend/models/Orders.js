const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customers = require('./Customers');

const Orders = sequelize.define(
	'orders',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		customerID: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		subTotal: {
			type: DataTypes.STRING(6),
			allowNull: false,
		},
		discount: {
			type: DataTypes.STRING(6),
			allowNull: true,
		},
		tax: {
			type: DataTypes.STRING(6),
			allowNull: true,
		},
		total: {
			type: DataTypes.STRING(6),
			allowNull: true,
		},
		paymentMethod: {
			type: DataTypes.STRING(14),
			allowNull: true,
		},
	},
	{
		indexes: [], // Empty array to remove all indexes and foreign keys
	},
);

Orders.sync({ alter: true })
	.then(() => {
		console.log('Orders model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Orders model:', error);
	});

module.exports = Orders;
