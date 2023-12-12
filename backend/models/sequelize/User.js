const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: DataTypes.STRING(128),
	email: {
		type: DataTypes.STRING(128),
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(128),
		allowNull: false,
	},
	verified: DataTypes.BOOLEAN,
});

User.sync({ alter: true })
	.then(() => {
		console.log('User model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize User model:', error);
	});

module.exports = User;
