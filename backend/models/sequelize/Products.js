const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Products = sequelize.define('products', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	userID: DataTypes.INTEGER,
	categoryID: DataTypes.INTEGER,
	name: {
		type: DataTypes.STRING(128),
		allowNull: false,
	},
	description: DataTypes.STRING(500),
	image: DataTypes.STRING(60),
	price: {
		type: DataTypes.STRING(8),
		allowNull: false,
	},
	newPrice: DataTypes.STRING(8),
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	barcode: DataTypes.STRING(30),
});

Products.sync()
	.then(() => {
		console.log('Products model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Products model:', error);
	});

module.exports = Products;
