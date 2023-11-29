const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Settings = sequelize.define('settings', {
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
	key: {
		type: DataTypes.STRING(128),
		allowNull: true,
	},
	value: {
		type: DataTypes.STRING(128),
		allowNull: false,
	},
});

Settings.sync({ alter: true })
	.then(() => {
		console.log('Settings model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Settings model:', error);
	});

module.exports = Settings;
