const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customers = sequelize.define(
	'Customers',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		fName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		zip: {
			type: DataTypes.STRING,
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
