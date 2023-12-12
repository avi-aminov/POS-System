const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Products = require('./Products'); // Import the Products model

const Categories = sequelize.define(
	'categories',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(124),
			allowNull: false,
		},
		image: DataTypes.STRING(60),
	},
);

// Define association with Products model
Categories.hasMany(Products, { foreignKey: 'categoryID' });

// { alter: true }
Categories.sync({ alter: true })
	.then(() => {
		console.log('Categories model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Categories model:', error);
	});

module.exports = Categories;
