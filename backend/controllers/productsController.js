const Product = require('../models/mongoose/productModel');
const answer = require('../utils/answer');

const fetchProducts = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;
		const products = await Product.find({ userID, isDelete: false });

		if (!products || products.length === 0) {
			return answer(200, 'fetchProducts empty products', res, []);
		}

		return answer(200, 'fetchProducts successfully', res, products);
	} catch (error) {
		console.error('Error fetching products:', error);
		return answer(500, 'Internal Server Error', res);
	}
};

const updateProductIsDelete = async (req, res) => {
	try {
		const productId = req.params.productId;

		// Check if the product ID is provided
		if (!productId) {
			return answer(400, 'Product ID is required', res);
		}

		// Check if the user is authenticated
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}

		const userID = req.user._id;

		// Find the product by ID and user ID
		const product = await Product.findOne({ _id: productId, userID });

		// Check if the product exists
		if (!product) {
			return answer(404, 'Product not found', res);
		}

		// Update the isDelete key to true
		product.isDelete = true;

		// Save the updated product
		await product.save();

		return answer(200, 'Product isDelete updated successfully', res, product);
	} catch (error) {
		console.error('Error updating product isDelete:', error);
		return answer(500, 'Internal Server Error', res);
	}
};

const addProduct = async (req, res) => {
	if (!req.user._id) {
		return answer(401, 'User Not Exist', res);
	}

	const userID = req.user._id;
	const {
		name,
		description,
		price,
		newPrice,
		stock,
		barcode,
		categoryID,
		image
	} = req.body;

	try {
		const product = await Product.create({
			userID,
			name,
			description,
			price,
			newPrice,
			stock,
			barcode,
			categoryID,
			image,
			isDelete: false
		});

		return answer(200, 'Product added successfully', res, product);
	} catch (error) {
		console.error('Error creating the product:', error);
		return answer(500, 'Failed to create the product', res);
	}
};

const updateProduct = async (req, res) => {
	if (!req.user._id) {
		return answer(401, 'User Not Exist', res);
	}
	const userID = req.user._id;

	const {
		_id,
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
		const product = await Product.findById(_id);

		if (!product) {
			return answer(404, 'Product not found', res);
		}

		// Check if the product belongs to the authenticated user
		if (product.userID.toString() !== userID.toString()) {
			return answer(403, 'Unauthorized: Product does not belong to the user', res);
		}

		// Update the product's attributes
		product.set({
			name,
			description,
			price,
			newPrice,
			stock,
			barcode,
			categoryID,
			image,
			isDelete: false
		});

		await product.save();

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
	updateProductIsDelete
};
