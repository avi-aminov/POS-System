const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING(124),
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING(60),
			allowNull: true,
		},
	},
	{
		/**
		 * Other model options go here
		 */
	},
);

// { alter: true }
Categories.sync({ alter: true })
	.then(() => {
		console.log('Categories model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Categories model:', error);
	});

module.exports = Categories;
