// connection.js
const initDatabaseConnection = async (db) => {
	console.log('Testing the database connection..');
	try {
		// Test the connection.
		await db.authenticate();
		console.log('Connection has been established successfully.');

		return true;
	} catch (error) {
		throw error; // Throw the error if the connection fails
	}
};

module.exports = {
	initDatabaseConnection,
};
