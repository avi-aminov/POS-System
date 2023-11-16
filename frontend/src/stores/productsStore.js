import axios from 'axios';
import { observable, action } from 'mobx';

const productsStore = observable({
	products: [],
	searchQuery: '',

	fetchProducts: action(async function () {
		try {
			const { data } = await axios.get('/products');
			if (!data.data) {
				return;
			}
			this.products = data.data;
			console.log('products', data.data);
		} catch (error) {
			console.log(error);
		}
	}),

	setSearchQuery: action(function (str) {
		this.searchQuery = str;
	}),
});

export default productsStore;
