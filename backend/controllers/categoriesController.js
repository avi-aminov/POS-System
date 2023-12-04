const Category = require('../models/mongoose/categoriesModel');
const answer = require('../utils/answer');

const fetchCategories = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const categories = await Category.find({ userID });

		if (!categories || categories.length === 0) {
			return answer(200, 'fetchCategories empty Categories', res, []);
		}

		return answer(200, 'fetchCategories successfully', res, categories);
	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
};

const addCategory = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const { name, image } = req.body;

		const category = await Category.create({
			userID,
			name,
			image,
		});

		return answer(200, 'Category added successfully', res, category);
	} catch (error) {
		console.error(error);
		return answer(500, 'Failed to create the category', res);
	}
};

module.exports = {
	fetchCategories,
	addCategory,
};
