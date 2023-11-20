import { observable } from 'mobx';

const settingsStore = observable({
	settings: {
		currencySymbol: '$', // $, ₪
		direction: 'ltr', // rtl, ltr
		tax: 17,
		lang: 'eng' // heb, eng
	},

	getTax() {
		return this.settings.tax / 100;
	},
});

export default settingsStore;
