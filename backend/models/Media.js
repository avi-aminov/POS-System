const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('media', {
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
	path: {
		type: DataTypes.STRING(60),
		allowNull: true,
	},
});

Media.sync({ alter: true })
	.then(() => {
		console.log('Media model synchronized successfully');
	})
	.catch((error) => {
		console.error('Unable to synchronize Media model:', error);
	});

module.exports = Media;
