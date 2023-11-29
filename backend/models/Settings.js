const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Settings = sequelize.define('settings', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	key: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	value: {
		type: DataTypes.STRING(30),
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
