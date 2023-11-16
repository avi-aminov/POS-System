const Customers = require('../models/Customers');
const answer = require('../utils/answer');

const fetchCustomers = async (req, res) => {
	try {
		const customers = await Customers.findAll();

		if (!customers) {
			answer(404, 'No customers found', res);
		}
		answer(200, 'fetchCustomers successfully', res, customers);
	} catch (error) {
		answer(500, 'Internal Server Error', res);
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const createCustomers = async (req, res) => {
	const { fName, lName, email, phone, address, city, zip } = req.body;

	try {
		const customer = await Customers.create({
			fName,
			lName,
			email,
			phone,
			address,
			city,
			zip,
		});

		res.json({ customer });
	} catch (error) {
		// Handle any errors that may occur during the creation of the customer
		console.error(error);
		res.status(500).json({ error: 'Failed to create the customer' });
	}
};

module.exports = {
	fetchCustomers,
	createCustomers,
};
