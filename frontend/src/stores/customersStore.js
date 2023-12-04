import axios from 'axios';
import { observable, action, toJS } from 'mobx';

const customersStore = observable({
	customers: [],
	selectedCustomers: null,
	showAddCustomerDrawer: false,

	// create data
	createForm: {
		fName: '',
		lName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		zip: '',
	},

	// data for show all customer data on select input
	customerSelectData: [],

	// data of selected customer
	customerSelectedData: {},

	fetchCustomers: action(async function () {
		try {
			const { data } = await axios.get('/customers');
			if (!data.data) {
				return;
			}
			this.customers = data.data;
			this.getCustomerSelectData();
			this.loadFromLocalStorage();
		} catch (error) {
			console.log(error);
		}
	}),

	// set create form data
	setCreateForm: action(function (newData) {
		this.createForm = newData;
	}),

	// create new Customer
	createCustomer: action(async function () {
		try {
			const res = await axios.post('/customers', this.createForm);
			if (res && res.data.data) {
				this.customers = [...this.customers, res.data.data];

				// Reset the form
				this.setCreateForm({
					fName: '',
					lName: '',
					email: '',
					phone: '',
					address: '',
					city: '',
					zip: '',
				});
			}
		} catch (error) {
			console.error('Error creating customer:', error);
		}
	}),

	// delete Customer
	deleteCustomer: action(async function (customerId) {
		try {
			// Make an HTTP request to delete the customer
			await axios.delete(`/delete-customer/${customerId}`);

			// Remove the deleted customer from the local store
			const updatedCustomers = toJS(this.customers).filter(
				(customer) => customer._id !== customerId
			);
			this.customers = updatedCustomers;

			console.log(`Customer with ID ${customerId} deleted successfully`);
		} catch (error) {
			console.error('Error deleting customer:', error);
		}
	}),

	editCustomer: action(async function (customerData) {
		try {
			const response = await axios.put(`/edit-customer`, customerData);

			if (response.data && response.data.data) {
				// Update the customer directly in the array
				this.customers.map((customer) =>
					customer._id === customerData._id ? response.data.data : customer
				);
				//this.customers = new_data;
			} else {
				console.error('Invalid response structure:', response);
			}
		} catch (error) {
			console.error('Error updating customer:', error);
		}
	}),

	getCustomerSelectData: action(async function () {
		this.customerSelectData = this.customers.map(
			({ _id, fName, lName }) => ({
				value: _id,
				label: `${fName} ${lName}`,
			}),
		);
	}),

	setSelectedCustomers: action(function (id) {
		this.selectedCustomers = id;

		this.customerSelectedData = this.customers.find(
			(item) => item._id === id,
		);
		this.saveToLocalStorage(id);
	}),

	saveToLocalStorage: action(function (id) {
		localStorage.setItem('selectedCustomers', id);
	}),

	loadFromLocalStorage: action(function () {
		const selectedCustomers = localStorage.getItem('selectedCustomers');

		if (selectedCustomers) {
			this.setSelectedCustomers(parseInt(selectedCustomers, 10));
		}
	}),

	clearSelectedCustomers: action(function () {
		this.selectedCustomers = null;
		this.customerSelectedData = {};
		localStorage.removeItem('selectedCustomers');
	}),
});

export default customersStore;
