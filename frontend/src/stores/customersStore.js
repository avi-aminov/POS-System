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

			console.log('this.customers', toJS(this.customers));
		} catch (error) {
			console.log(error);
		}
	}),

	// set create form data
	setCreateForm: action(function (newData) {
		this.createForm = newData;
	}),

	// create new Customer
	createCutsomer: action(async function () {
		console.log('createForm', toJS(this.createForm));
		const res = await axios.post('/customers', this.createForm);
		if (res) {
			this.setNotes([...this.customers, res.data.customers]);
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
	}),

	getCustomerSelectData: action(async function () {
		this.customerSelectData = this.customers.map(
			({ id, fName, lName }) => ({
				value: id,
				label: `${fName} ${lName}`,
			}),
		);
	}),

	setSelectedCustomers: action(function (id) {
		this.selectedCustomers = id;

		this.customerSelectedData = this.customers.find(
			(item) => item.id === id,
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
