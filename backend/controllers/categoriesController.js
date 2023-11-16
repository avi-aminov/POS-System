const Categories = require('../models/Categories');
const answer = require('../utils/answer');

const fetchCategories = async (req, res) => {
	try {
		const categories = await Categories.findAll();

		if (!categories) {
			answer(404, 'No categories found', res);
		}
		answer(200, 'fetchCategories successfully', res, categories);
	} catch (error) {
		answer(500, 'Internal Server Error', res);
	}
};

const addCategory = async (req, res) => {
	const { name, image } = req.body;

	try {
		const category = await Categories.create({
			name,
			image,
		});

		answer(200, 'category added successfully', res, category);
	} catch (error) {
		answer(500, 'Failed to create the category', res);
	}
};

module.exports = {
	fetchCategories,
	addCategory,
};
