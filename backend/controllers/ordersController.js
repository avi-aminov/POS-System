const Order = require('../models/mongoose/orderModel');
const Customer = require('../models/mongoose/customerModel');
const OrderItem = require('../models/mongoose/orderItemsModel');
const answer = require('../utils/answer');

const fetchOrders = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}
		const userID = req.user._id; // Assuming user ID is available in req.user

		// Fetch orders where userID matches the authenticated user's ID
		const orders = await Order.find({ userID });


		if (!orders || orders.length === 0) {
			return answer(200, 'No orders found', res, []);
		}

		// Fetch customers based on customerID from orders
		const customerIDs = orders.map(order => order.customerID);

		const customers = await Customer.find({
			_id: { $in: customerIDs },
			userID,
		});

		// Create a map for quick lookup of customer details by ID
		const customerMap = customers.reduce((map, customer) => {
			if (customer._id) {
				map[customer._id.toString()] = customer;
			}
			return map;
		}, {});

		// Extract the relevant information from the result
		const formattedOrders = orders.map((order) => ({
			id: order._id,
			customerID: order.customerID,
			subTotal: order.subTotal,
			discount: order.discount,
			tax: order.tax,
			total: order.total,
			paymentMethod: order.paymentMethod,
			fName: order.customerID && customerMap[order.customerID.toString()] ? customerMap[order.customerID.toString()].fName : '',
			lName: order.customerID && customerMap[order.customerID.toString()] ? customerMap[order.customerID.toString()].lName : '',
			phone: order.customerID && customerMap[order.customerID.toString()] ? customerMap[order.customerID.toString()].phone : '',
			createdAt: order.createdAt,
			updatedAt: order.updatedAt,
		}));

		return answer(200, 'fetchOrders successfully', res, formattedOrders);
	} catch (error) {
		console.error(error);
		return answer(500, 'Internal Server Error', res);
	}
};

const createOrders = async (req, res) => {
	try {
		if (!req.user._id) {
			return answer(401, 'User Not Exist', res);
		}
		const userID = req.user._id; // Assuming user ID is available in req.user

		const { cart, customerID, subTotal, discount, tax, total, paymentMethod } = req.body;

		console.log(
			userID,
			cart,
			customerID,
			subTotal,
			discount,
			tax,
			total,
			paymentMethod,
		);

		// Create the order
		const createdOrder = await Order.create({
			userID,
			customerID,
			subTotal,
			discount,
			tax,
			total,
			paymentMethod,
		});

		const orderID = createdOrder._id; // Get the ID of the created order

		// Now, create order items for each product in the cart
		const orderItemsData = cart.map((cartItem) => ({
			userID,
			orderID,
			productID: cartItem.id === 9999 ? null : cartItem._id,
			customerID,
			price: cartItem.price,
			quantity: cartItem.quantity,
			totalPrice: (cartItem.price * cartItem.quantity).toString(),
		}));

		// Create the order items
		const createdOrderItems = await OrderItem.insertMany(orderItemsData);

		return answer(200, 'Order and order items created successfully', res, {
			order: createdOrder,
			orderItems: createdOrderItems,
		});
	} catch (error) {
		// Handle any errors that may occur during the creation of the order
		console.error(error);
		return answer(500, 'Failed to create the order', res);
	}
};

module.exports = {
	fetchOrders,
	createOrders,
};
