import axios from 'axios';
import { observable, action } from 'mobx';

const categoriesStore = observable({
	categories: [],
	selecedCategory: 0,

	fetchCategories: action(async function () {
		try {
			const { data } = await axios.get('/categories');
			if (!data.data) {
				return;
			}
			this.categories = data.data;
			console.log('categories', data.data);
		} catch (error) {
			console.log(error);
		}
	}),

	setSelecedCategory: action(function (id) {
		this.selecedCategory = id;
	}),
});

export default categoriesStore;
