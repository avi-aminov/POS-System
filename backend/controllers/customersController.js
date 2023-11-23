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

const editCustomer = async (req, res) => {
	const { id, fName, lName, email, phone, address, city, zip } = req.body;

	try {
		// Check if the customer with the given ID exists
		const existingCustomer = await Customers.findByPk(id);
		if (!existingCustomer) {
			return answer(404, 'Customer not found', res);
		}

		// Update the customer's information
		await existingCustomer.update({
			fName,
			lName,
			email,
			phone,
			address,
			city,
			zip,
		});

		answer(200, 'Customer updated successfully', res, existingCustomer);
	} catch (error) {
		console.error(error);
		answer(500, 'Internal Server Error', res);
	}
};


const deleteCustomer = async (req, res) => {
	const customerId = req.params.id;

	try {
		// Find the customer by ID
		const customer = await Customers.findByPk(customerId);

		if (!customer) {
			return answer(404, 'Customer not found', res);
		}

		// Delete the customer
		await customer.destroy();

		answer(200, 'Customer deleted successfully', res);
	} catch (error) {
		console.error(error);
		answer(500, 'Internal Server Error', res);
	}
};

module.exports = {
	fetchCustomers,
	createCustomers,
	editCustomer,
	deleteCustomer
};
