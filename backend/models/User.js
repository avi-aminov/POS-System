const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	verified: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
});

User.sync({ alter: true })
	.then(() => {
		console.log('User model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize User model:', error);
	});

module.exports = User;
