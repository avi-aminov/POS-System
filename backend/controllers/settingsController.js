const Settings = require('../models/mongoose/settingsModel');
const answer = require('../utils/answer');

const fetchSettings = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const settings = await Settings.find({ userID });

		if (!settings || settings.length === 0) {
			return answer(200, 'No settings found', res, []);
		}

		return answer(200, 'fetchSettings successfully', res, settings);
	} catch (error) {
		return answer(500, 'Internal Server Error', res);
	}
};

const updateValueByKey = async (req, res) => {
	if (!req.user._id) {
		return answer(401, 'User Not Exist', res);
	}

	const userID = req.user._id;
	const { key } = req.params;
	const { value } = req.body;

	try {
		// Check if the setting with the provided key exists
		const existingSetting = await Settings.findOne({
			key,
			userID,
		});

		if (existingSetting) {
			// Update the value of the existing setting
			existingSetting.value = value;
			await existingSetting.save();
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


async function saveMultipleKeys(req, res) {
	if (!req.user._id) {
		return answer(401, 'User Not Exist', res);
	}

	const userID = req.user._id;
	const keyValuePairs = req.body;

	try {
		// Use Promise.all to perform multiple updates
		const updatedSettings = await Promise.all(
			Object.entries(keyValuePairs).map(async ([key, value]) => {
				// Check if the setting with the provided key exists
				const existingSetting = await Settings.findOne({
					key,
					userID,
				});

				if (existingSetting) {
					// Update the value of the existing setting
					existingSetting.value = value;
					await existingSetting.save();
					return existingSetting;
				}

				// If the setting doesn't exist, create a new setting
				const newSetting = await Settings.create({
					key,
					value,
					userID,
				});

				return newSetting;
			})
		);

		return answer(200, 'Settings updated successfully', res, updatedSettings);
	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
}

module.exports = {
	fetchSettings,
	updateValueByKey,
	saveMultipleKeys
};
