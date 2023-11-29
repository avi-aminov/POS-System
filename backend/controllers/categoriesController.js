const Categories = require('../models/Categories');
const answer = require('../utils/answer');

const fetchCategories = async (req, res) => {
	try {
		if (!req.user.id) return answer(401, 'User Not Exist', res);

		const userID = req.user.id;
		const categories = await Categories.findAll({
			where: { userID },
		});

		if (!categories || categories.length === 0) {
			return answer(200, 'fetchCategories empty Categories', res, []);
		}
		return answer(200, 'fetchCategories successfully', res, categories);
	} catch (error) {
		return answer(500, 'Internal Server Error', res);
	}
};

const addCategory = async (req, res) => {

	if (!req.user.id) return answer(401, 'User Not Exist', res);

	const userID = req.user.id;
	const { name, image } = req.body;

	try {
		const category = await Categories.create({
			userID,
			name,
			image,
		});

		return answer(200, 'category added successfully', res, category);
	} catch (error) {
		return answer(500, 'Failed to create the category', res);
	}
};

module.exports = {
	fetchCategories,
	addCategory,
};
