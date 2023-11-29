const Customers = require('../models/Customers');
const answer = require('../utils/answer');

const fetchCustomers = async (req, res) => {
	try {
		if (!req.user.id) return answer(401, 'User Not Exist', res);

		const userID = req.user.id;
		const customers = await Customers.findAll({
			where: { userID },
		});

		if (!customers || customers.length === 0) {
			return answer(200, 'fetchCustomers empty customers', res, []);
		}

		return answer(200, 'fetchCustomers successfully', res, customers);
	} catch (error) {
		console.error(error);
		return answer(500, 'Failed to fetch customers', res);
	}
};

const createCustomers = async (req, res) => {
	if (!req.user.id) return answer(401, 'User Not Exist', res);

	const userID = req.user.id;
	const { fName, lName, email, phone, address, city, zip } = req.body;

	try {
		const customer = await Customers.create({
			userID,
			fName,
			lName,
			email,
			phone,
			address,
			city,
			zip,
		});

		return answer(200, 'createCustomers successfully', res, customer);
	} catch (error) {
		console.error(error);
		return answer(500, 'Failed to create the customer', res);
	}
};

const editCustomer = async (req, res) => {
	if (!req.user.id) return answer(401, 'User Not Exist', res);

	const { id, fName, lName, email, phone, address, city, zip } = req.body;

	try {
		// Check if the customer with the given ID exists
		const existingCustomer = await Customers.findByPk(id);

		// Check if the customer exists and belongs to the authenticated user
		if (!existingCustomer || existingCustomer.userID !== req.user.id) {
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

		return answer(200, 'Customer updated successfully', res, existingCustomer);
	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
};

const deleteCustomer = async (req, res) => {
	if (!req.user.id) return answer(401, 'User Not Exist', res);
	const userID = req.user.id;
	const customerId = req.params.id;

	try {
		// Find the customer by ID
		const customer = await Customers.findByPk(customerId);

		// Check if the customer exists and belongs to the authenticated user
		if (!customer || customer.userID !== userID) {
			return answer(404, 'Customer not found', res);
		}

		// Delete the customer
		await customer.destroy();

		return answer(200, 'Customer deleted successfully', res);
	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
};

module.exports = {
	fetchCustomers,
	createCustomers,
	editCustomer,
	deleteCustomer
};
