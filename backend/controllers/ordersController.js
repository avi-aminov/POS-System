const Orders = require('../models/Orders');
const OrderItems = require('../models/OrderItems');
const Customers = require('../models/Customers');
const answer = require('../utils/answer');

const fetchOrders = async (req, res) => {
	try {
		if (!req.user.id) return answer(401, 'User Not Exist', res);
		const userID = req.user.id; // Assuming user ID is available in req.user

		// Fetch orders where userID matches the authenticated user's ID
		const orders = await Orders.findAll({
			where: {
				userID,
			},
		});

		if (!orders || orders.length === 0) {
			return answer(404, 'No orders found', res, []);
		}

		// Fetch customers based on customerID from orders
		const customerIDs = orders.map(order => order.customerID);
		const customers = await Customers.findAll({
			attributes: ['id', 'fName', 'lName', 'phone'],
			where: {
				id: customerIDs,
				userID
			},
		});

		// Create a map for quick lookup of customer details by ID
		const customerMap = customers.reduce((map, customer) => {
			map[customer.id] = customer;
			return map;
		}, {});

		// Extract the relevant information from the result
		const formattedOrders = orders.map((order) => ({
			id: order.id,
			customerID: order.customerID,
			subTotal: order.subTotal,
			discount: order.discount,
			tax: order.tax,
			total: order.total,
			paymentMethod: order.paymentMethod,
			fName: customerMap[order.customerID] ? customerMap[order.customerID].fName : '',
			lName: customerMap[order.customerID] ? customerMap[order.customerID].lName : '',
			phone: customerMap[order.customerID] ? customerMap[order.customerID].phone : '',
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
	if (!req.user.id) return answer(401, 'User Not Exist', res);
	const userID = req.user.id; // Assuming user ID is available in req.user

	const { cart, customerID, subTotal, discount, tax, total, paymentMethod } =
		req.body;

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

	try {
		const createdOrder = await Orders.create({
			userID,
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
			userID,
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

		return answer(200, 'Order and order items created successfully', res, {
			order: createdOrder,
			orderItems: createdOrderItems,
		});
	} catch (error) {
		// Handle any errors that may occur during the creation of the order
		return answer(500, 'Failed to create the order', res);
	}
};

module.exports = {
	fetchOrders,
	createOrders,
};
