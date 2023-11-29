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
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(30),
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(60),
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
