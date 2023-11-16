const Orders = require('../models/Orders');
const OrderItems = require('../models/OrderItems');
const Customers = require('../models/Customers');
const answer = require('../utils/answer');

const fetchOrders = async (req, res) => {
	try {
		const orders = await Orders.findAll({
			include: [
				{
					model: Customers,
					attributes: ['fName', 'lName', 'phone'], // Include only these columns from Customers
				},
			],
		});

		if (!orders) {
			answer(404, 'No orders found', res);
		}

		// Extract the relevant information from the result
		const formattedOrders = orders.map((order) => ({
			id: order.id,
			customerID: order.customerID,
			subTotal: order.subTotal,
			discount: order.discount,
			tax: order.tax,
			total: order.total,
			paymentMethod: order.paymentMethod,
			fName: order.customerID ? order.Customer.fName : '',
			lName: order.customerID ? order.Customer.lName : '',
			phone: order.customerID ? order.Customer.phone : '',
			createdAt: order.createdAt,
			updatedAt: order.updatedAt,
		}));

		answer(200, 'fetchOrders successfully', res, formattedOrders);
	} catch (error) {
		answer(500, 'Internal Server Error', res);
		console.error(error);
	}
};

const createOrders = async (req, res) => {
	const { cart, customerID, subTotal, discount, tax, total, paymentMethod } =
		req.body;

	console.log(
		cart,
		customerID,
		subTotal,
		discount,
		tax,
		total,
		paymentMethod,
	);

	try {
		const createdOrder = await Orders.create({
			customerID,
			subTotal,
			discount,
			tax,
			total,
			paymentMethod,
		});

		const orderID = createdOrder.id; // Get the ID of the created order

		// Now, create order items for each product in the cart
		const orderItemsData = cart.map((cartItem) => ({
			orderID,
			productID: cartItem.id,
			customerID: customerID,
			price: cartItem.price,
			quantity: cartItem.quantity,
			totalPrice: (cartItem.price * cartItem.quantity).toString(),
		}));

		const createdOrderItems = await OrderItems.bulkCreate(orderItemsData, {
			individualHooks: true, // This enables individual hooks for each row
		});

		answer(200, 'Order and order items created successfully', res, {
			order: createdOrder,
			orderItems: createdOrderItems,
		});
	} catch (error) {
		// Handle any errors that may occur during the creation of the order
		answer(500, 'Failed to create the order', res);
	}
};

module.exports = {
	fetchOrders,
	createOrders,
};
