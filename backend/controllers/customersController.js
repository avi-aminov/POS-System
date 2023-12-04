const Customer = require('../models/mongoose/customerModel');
const answer = require('../utils/answer');

const fetchCustomers = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const customers = await Customer.find({ userID });

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
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const { fName, lName, email, phone, address, city, zip } = req.body;

		const customer = await Customer.create({
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
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const { _id, fName, lName, email, phone, address, city, zip } = req.body;

		// Check if the customer with the given ID exists
		const existingCustomer = await Customer.findById(_id);

		// Check if the customer exists and belongs to the authenticated user
		if (!existingCustomer || existingCustomer.userID.toString() !== req.user._id.toString()) {
			return answer(404, 'Customer not found', res);
		}

		// Update the customer's information
		const updatedCustomer = await existingCustomer.updateOne({
			fName,
			lName,
			email,
			phone,
			address,
			city,
			zip,
		});

		return answer(200, 'Customer updated successfully', res, updatedCustomer);
	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
};

const deleteCustomer = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const customerId = req.params.id;

		// Find the customer by ID
		const customer = await Customer.findById(customerId);

		// Check if the customer exists and belongs to the authenticated user
		if (!customer || customer.userID.toString() !== userID.toString()) {
			return answer(404, 'Customer not found', res);
		}

		// Delete the customer
		await customer.deleteOne();

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
