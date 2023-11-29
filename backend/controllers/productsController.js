const Products = require('../models/Products');
const answer = require('../utils/answer');

const fetchProducts = async (req, res) => {
	try {
		if (!req.user.id) return answer(401, 'User Not Exist', res);

		const userID = req.user.id;
		const products = await Products.findAll({
			where: { userID },
		});

		if (!products || products.length === 0) {
			return answer(200, 'fetchProducts empty products', res, []);
		}

		return answer(200, 'fetchProducts successfully', res, products);
	} catch (error) {
		console.error('Error fetching products:', error);
		return answer(500, 'Internal Server Error', res);
	}
};

const addProduct = async (req, res) => {

	if (!req.user.id) return answer(401, 'User Not Exist', res);

	const userID = req.user.id;
	const {
		name,
		description,
		price,
		newPrice,
		stock,
		barcode,
		categoryID,
		image,
	} = req.body;

	try {
		const category = await Products.create({
			userID,
			name,
			description,
			price,
			newPrice,
			stock,
			barcode,
			categoryID,
			image,
		});

		return answer(200, 'Product added successfully', res, category);
	} catch (error) {
		return answer(500, 'Failed to create the product', res);
	}

};

const updateProduct = async (req, res) => {
	if (!req.user.id) return answer(401, 'User Not Exist', res);
	const userID = req.user.id;

	const {
		id,
		name,
		description,
		price,
		newPrice,
		stock,
		barcode,
		categoryID,
		image,
	} = req.body;

	try {
		// Find the product by ID
		const product = await Products.findByPk(id);

		if (!product) {
			return answer(404, 'Product not found', res);
		}

		// Check if the product belongs to the authenticated user
		if (product.userID !== userID) {
			return answer(403, 'Unauthorized: Product does not belong to the user', res);
		}

		// Update the product's attributes
		await product.update({
			name,
			description,
			price,
			newPrice,
			stock,
			barcode,
			categoryID,
			image,
		});

		return answer(200, 'Product updated successfully', res, product);
	} catch (error) {
		console.error(error);
		return answer(500, 'Failed to update the product', res);
	}
};

module.exports = {
	fetchProducts,
	addProduct,
	updateProduct,
};
