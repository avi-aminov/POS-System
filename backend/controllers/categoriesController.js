const Category = require('../models/mongoose/categoriesModel');
const answer = require('../utils/answer');

const fetchCategories = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const categories = await Category.find({ userID, isDelete: false });

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
			isDelete: false
		});

		return answer(200, 'Category added successfully', res, category);
	} catch (error) {
		console.error(error);
		return answer(500, 'Failed to create the category', res);
	}
};

const updateCategoryIsDelete = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;

		// Check if the product ID is provided
		if (!categoryId) {
			return answer(400, 'Category ID is required', res);
		}

		// Check if the user is authenticated
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;

		// Find the Category by ID and user ID
		const category = await Category.findOne({ _id: categoryId, userID });

		// Check if the Category exists
		if (!category) {
			return answer(404, 'Category not found', res);
		}

		// Update the isDelete key to true
		category.isDelete = true;

		// Save the updated Category
		await category.save();

		return answer(200, 'Category isDelete updated successfully', res, category);
	} catch (error) {
		console.error('Error updating Category isDelete:', error);
		return answer(500, 'Internal Server Error', res);
	}
};

module.exports = {
	fetchCategories,
	addCategory,
	updateCategoryIsDelete
};
