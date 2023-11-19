import { observable } from 'mobx';

const settingsStore = observable({
	settings: {
		currencySymbol: '$',
		direction: 'ltr',
		tax: 17,
		lang: 'eng'
	},

	getTax() {
		return this.settings.tax / 100;
	},
});

export default settingsStore;
