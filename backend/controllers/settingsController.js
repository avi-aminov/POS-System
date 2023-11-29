const Settings = require('../models/Settings');
const answer = require('../utils/answer');

const fetchSettings = async (req, res) => {
	try {
		if (!req.user.id) return answer(401, 'User Not Exist', res);

		const userID = req.user.id;
		const settings = await Settings.findAll({
			where: { userID },
		});

		if (!settings || settings.length === 0) {
			return answer(200, 'No settings found', res, []);
		}

		return answer(200, 'fetchSettings successfully', res, settings);
	} catch (error) {
		return answer(500, 'Internal Server Error', res);
	}
};

const updateValueByKey = async (req, res) => {
	if (!req.user.id) {
		return answer(401, 'User Not Exist', res);
	}

	const userID = req.user.id;
	const { key } = req.params; // Assuming the key is part of the route parameters
	const { value } = req.body;

	try {
		// Check if the setting with the provided key exists
		const existingSetting = await Settings.findOne({
			where: {
				key,
				userID,
			},
		});

		if (existingSetting) {
			// Update the value of the existing setting
			await existingSetting.update({ value });
			return answer(200, 'Setting updated successfully', res, existingSetting);
		}

		// If the setting doesn't exist, create a new setting
		const newSetting = await Settings.create({
			key,
			value,
			userID,
		});

		return answer(201, 'Setting created successfully', res, newSetting);

	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
};


module.exports = {
	fetchSettings,
	updateValueByKey,
};
