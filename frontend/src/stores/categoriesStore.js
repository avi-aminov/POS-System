import axios from 'axios';
import { observable, action } from 'mobx';

const categoriesStore = observable({
	categories: [],
	selectedCategory: 0,
	editItem: null,
	categoryPopupVisible: false,
	drawerVisible: false,

	setEditItem: action(function (value) {
		this.editItem = value;
	}),

	setDrawerVisible: action(function (value) {
		this.drawerVisible = value;
	}),

	setCategoryPopupVisible: action(function (value) {
		this.categoryPopupVisible = value;
	}),

	fetchCategories: action(async function () {
		try {
			const { data } = await axios.get('/categories');
			if (!data.data) {
				return;
			}
			this.categories = data.data;
			console.log('categories:', data.data)
		} catch (error) {
			console.log(error);
		}
	}),

	setSelectedCategory: action(function (id) {
		this.selectedCategory = id;
	}),

	// New action to add a product
	addCategory: action(function (category) {
		this.categories = [...this.categories, category];
	}),
});

export default categoriesStore;
