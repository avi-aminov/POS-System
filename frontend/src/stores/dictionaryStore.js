import { observable, action, toJS } from 'mobx';
//import axios from 'axios';
import settingsStore from './settingsStore';

const dictionaryStore = observable({
	dictionary: {
		home: {
			eng: "Home",
			heb: "בית"
		},
		orders: {
			eng: "Orders",
			heb: "הזמנות"
		},
		items: {
			eng: "Items",
			heb: "מוצרים"
		},
		customers: {
			eng: "Customers",
			heb: "לקוחות"
		},
		media: {
			eng: "Media",
			heb: "מדיה"
		},
		logout: {
			eng: "Logout",
			heb: "התנתק"
		}
	},

	fetchCategories: action(async function () {
		try {
			//const { data } = await axios.get('/categories');

		} catch (error) {
			console.log(error);
		}
	}),

	getString: action(function (str) {
		// Check if the provided string exists in the dictionary
		if (this.dictionary[str] && this.dictionary[str][settingsStore.settings.lang]) {
			return toJS(this.dictionary[str][settingsStore.settings.lang]);
		} else {
			return str;
		}
	}),
});

export default dictionaryStore;
