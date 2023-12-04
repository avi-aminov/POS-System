import axios from 'axios';
import { observable, action } from 'mobx';

const defaultSetting = {
	"currencySymbol": "$",
	"direction": "ltr",
	"tax": "17",
	"lang": "eng"
};

const settingsStore = observable({
	settings: defaultSetting,

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
				const defaultSettings = defaultSetting;

				// Assign default values for missing keys
				this.settings = {
					...defaultSettings,
					...transformedData
				};

				// Ensure that 'tax' is an integer
				this.settings.tax = parseInt(this.settings.tax, 10);
			} else {
				// No data received, use default settings
				this.settings = defaultSetting;
			}
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

	// New action to save multiple keys
	saveMultipleKeys: action(async function (keyValuePairs) {
		try {
			// Use Promise.all to perform multiple asynchronous updates
			await axios.put('/save-multiple-keys', keyValuePairs);

			// Update local state based on the response (if needed)
			Object.entries(keyValuePairs).forEach(([key, value]) => {
				this.settings[key] = value;
			});
		} catch (error) {
			console.log(error);
		}
	}),

	getTax() {
		return this.settings.tax / 100;
	},
});

export default settingsStore;
