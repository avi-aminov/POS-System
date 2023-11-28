const Settings = require('../models/Settings');
const answer = require('../utils/answer');

const fetchSettings = async (req, res) => {
	try {
		const settings = await Settings.findAll();

		if (!settings) {
			answer(404, 'No categories found', res);
		}
		answer(200, 'fetchCategories successfully', res, settings);
	} catch (error) {
		answer(500, 'Internal Server Error', res);
	}
};

const updateValueByKey = async (req, res) => {
	const { key } = req.params; // Assuming the key is part of the route parameters
	const { value } = req.body;

	try {
		// Check if the setting with the provided key exists
		const existingSetting = await Settings.findOne({ where: { key } });

		if (!existingSetting) {
			answer(404, 'Setting not found', res);
			return;
		}

		// Update the value of the existing setting
		await existingSetting.update({ value });

		answer(200, 'Setting updated successfully', res, existingSetting);
	} catch (error) {
		console.error(error);
		answer(500, 'Internal Server Error', res);
	}
};

module.exports = {
	fetchSettings,
	updateValueByKey,
};
