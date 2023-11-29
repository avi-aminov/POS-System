const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Products = sequelize.define('products', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	categoryID: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	name: {
		type: DataTypes.STRING(70),
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING(160),
		allowNull: true,
	},
	image: {
		type: DataTypes.STRING(20),
		allowNull: true,
	},
	price: {
		type: DataTypes.STRING(6),
		allowNull: false,
	},
	newPrice: {
		type: DataTypes.STRING(6),
		allowNull: true,
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	barcode: {
		type: DataTypes.STRING(10),
		allowNull: true,
	},
});

Products.sync()
	.then(() => {
		console.log('Products model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Products model:', error);
	});

module.exports = Products;
