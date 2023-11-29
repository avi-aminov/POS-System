import axios from 'axios';
import { observable, action } from 'mobx';

const settingsStore = observable({
	settings: {
		"currencySymbol": "$",
		"direction": "ltr",
		"tax": "17",
		"lang": "eng"
	},

	fetchSettings: action(async function () {
		try {
			const { data } = await axios.get('/settings');
			if (!data.data) {
				return;
			}

			if (data.data.length > 0) {
				const transformedData = data.data.reduce((acc, { key, value }) => {
					acc[key] = value;
					return acc;
				}, {});

				// Set default values for missing keys
				const defaultSettings = {
					"currencySymbol": "$",
					"direction": "ltr",
					"tax": "17",
					"lang": "eng"
				};

				// Assign default values for missing keys
				this.settings = {
					...defaultSettings,
					...transformedData
				};

				// Ensure that 'tax' is an integer
				this.settings.tax = parseInt(this.settings.tax, 10);
			} else {
				// No data received, use default settings
				this.settings = {
					"currencySymbol": "$",
					"direction": "ltr",
					"tax": "17",
					"lang": "eng"
				};
			}

			console.log('this.settings', this.settings)
		} catch (error) {
			console.log(error);
		}
	}),

	updateValueByKey: action(async function (key, newValue) {
		try {
			await axios.put(`/update-settings/${key}`, { value: newValue });
			this.settings[key] = newValue;
		} catch (error) {
			console.log(error);
		}
	}),

	getTax() {
		return this.settings.tax / 100;
	},
});

export default settingsStore;
