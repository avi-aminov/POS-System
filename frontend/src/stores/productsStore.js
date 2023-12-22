import axios from 'axios';
import { observable, action, toJS } from 'mobx';

const productsStore = observable({
	products: [],
	searchQuery: '',
	productPopupModal: false,
	drawerVisible: false,
	editItem: {},
	isEditItem: false,

	setEditItem: action(function (fieldName, value) {
		this.editItem[fieldName] = value;
	}),

	updateEditItem: action(function (value) {
		this.editItem = value;

		console.log(toJS(this.editItem))
	}),

	setPopupModal: action(function (value) {
		this.productPopupModal = value;
	}),

	setDrawerVisible: action(function (value) {
		this.drawerVisible = value;
	}),

	fetchProducts: action(async function () {
		try {
			const { data } = await axios.get('/products');
			if (!data.data) {
				return;
			}
			this.products = data.data;
			console.log('products:', data.data)
		} catch (error) {
			console.log(error);
		}
	}),

	setSearchQuery: action(function (str) {
		this.searchQuery = str;
	}),

	// New action to add a product
	addProduct: action(function (product) {
		this.products = [...this.products, product];
	}),

	saveProduct: action(async function (onSuccess, onError) {
		const data = { ...toJS(this.editItem) };
		try {
			await axios.post('/add-product', data);
			this.editItem = {};
			onSuccess();
		} catch (error) {
			onError(error);
		}
	}),

	editProduct: action(async function (onSuccess, onError) {
		// Create a copy of the editItem with _id
		const data = { ...toJS(this.editItem), _id: this.editItem._id };

		try {
			// Make the request to update the product
			await axios.post('/update-product', data);


			// Update the MobX store's products array
			const updatedProducts = this.products.map((product) =>
				product._id === this.editItem._id ? { ...product, ...data } : product
			);
			this.products = updatedProducts;
			this.setPopupModal(false);

			// Clear the editItem after a successful update
			this.editItem = {};

			onSuccess();
		} catch (error) {
			// Handle errors appropriately

			onError(error);
		}
	}),
});

export default productsStore;
