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
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
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

Categories.sync({ alter: true })
	.then(() => {
		console.log('Categories model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Categories model:', error);
	});

module.exports = Categories;
