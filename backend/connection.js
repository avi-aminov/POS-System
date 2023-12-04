// connection.js
const mongoose = require('mongoose');

const initDatabaseConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Unable to connect to MongoDB:', error);
		throw error;
	}
};

module.exports = {
	initDatabaseConnection,
};

