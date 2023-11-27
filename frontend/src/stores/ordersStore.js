import axios from 'axios';
import { observable, action, toJS } from 'mobx';
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
			console.log('this.orders', toJS(this.orders));
		} catch (error) {
			console.log(error);
		}
	}),

	// create new order
	createOrder: action(async function () {
		const order = {
			cart: cartStore.cart,
			customerID: customersStore.selectedCustomers,
			subTotal: cartStore.getSubTotal(),
			discount: cartStore.discount,
			tax: cartStore.getTax().toString(),
			total: cartStore.getTotalPrice(),
			paymentMethod: 'Cash',
		};
		const res = await axios.post('/orders', order);
		console.log('res: ', res);
		cartStore.clearCart();
		customersStore.clearSelectedCustomers();
	}),
});

export default ordersStore;
