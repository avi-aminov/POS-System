import axios from 'axios';
import { observable, action } from 'mobx';
import cartStore from '../stores/cartStore';
import customersStore from '../stores/customersStore';

const ordersStore = observable({
	orders: [],

	fetchOrder: action(async function () {
		try {
			const { data } = await axios.get('/orders');
			if (!data.data) {
				return;
			}
			this.orders = data.data;
		} catch (error) {
			console.log(error);
		}
	}),

	// create new order
	createOrder: action(async function (cb) {
		const order = {
			cart: cartStore.cart,
			customerID: customersStore.selectedCustomers,
			subTotal: cartStore.getSubTotal(),
			discount: cartStore.discount,
			tax: cartStore.getTax().toString(),
			total: cartStore.getTotalPrice(),
			paymentMethod: 'Cash',
		};
		await axios.post('/orders', order);
		cartStore.clearCart();
		customersStore.clearSelectedCustomers();
		cb();
	}),
});

export default ordersStore;
