import axios from 'axios';
import { observable, action } from 'mobx';

const productsStore = observable({
	products: [],
	searchQuery: '',
	productPopupModal: false,
	drawerVisible: false,
	editItem: null,

	setEditItem: action(function (value) {
		this.editItem = value;
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
});

export default productsStore;
