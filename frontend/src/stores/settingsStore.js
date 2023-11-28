import axios from 'axios';
import { observable, action } from 'mobx';

const settingsStore = observable({
	settings: {},

	fetchSettings: action(async function () {
		try {
			const { data } = await axios.get('/settings');
			if (!data.data) {
				return;
			}
			//this.settings = data.data;
			console.log('settings', data.data);

			const transformedData = data.data.reduce((acc, { key, value }) => {
				acc[key] = value;
				return acc;
			}, {});

			transformedData.tax = parseInt(transformedData.tax, 10);
			this.settings = transformedData;

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
