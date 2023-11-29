const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customers = sequelize.define(
	'customers',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		fName: {
			type: DataTypes.STRING(12),
			allowNull: true,
		},
		lName: {
			type: DataTypes.STRING(12),
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING(14),
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(30),
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		zip: {
			type: DataTypes.STRING(10),
			allowNull: true,
		},
	},
	{
		/**
		 * Other model options go here
		 */
	},
);

Customers.sync({ alter: true })
	.then(() => {
		console.log('Customers model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Customers model:', error);
	});

module.exports = Customers;
