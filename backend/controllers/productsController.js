const Products = require('../models/Products');
const answer = require('../utils/answer');

const fetchProducts = async (req, res) => {
	try {
		const products = await Products.findAll();

		if (!products) {
			answer(404, 'No products found', res);
		}
		answer(200, 'fetchProducts successfully', res, products);
	} catch (error) {
		answer(500, 'Internal Server Error', res);
	}
};

const addProduct = async (req, res) => {
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
			name,
			description,
			price,
			newPrice,
			stock,
			barcode,
			categoryID,
			image,
		});

		answer(200, 'Product added successfully', res, category);
	} catch (error) {
		answer(500, 'Failed to create the product', res);
	}
};

const updateProduct = async (req, res) => {
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

		answer(200, 'Product updated successfully', res, product);
	} catch (error) {
		console.error(error);
		answer(500, 'Failed to update the product', res);
	}
};

module.exports = {
	fetchProducts,
	addProduct,
	updateProduct,
};
