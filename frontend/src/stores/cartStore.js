import { observable, action, toJS } from 'mobx';
import settingStore from '../stores/settingsStore';

const cartStore = observable({
	cart: [],
	discount: 0.00,

	setDiscount: action(function (price) {
		this.discount = price;
		this.saveDiscountToLocalStorage();
	}),

	saveDiscountToLocalStorage: action(function () {
		localStorage.setItem('discount', this.discount.toString());
	}),

	loadDiscountFromLocalStorage: action(function () {
		const storedDiscount = localStorage.getItem('discount');
		if (storedDiscount) {
			this.discount = parseFloat(storedDiscount);
		}
	}),

	addToCart: action(function (item) {
		const existingItem = this.cart.find(
			(cartItem) => cartItem.id === item.id,
		);

		if (existingItem) {
			existingItem.quantity += 1;
			existingItem.totalPrice = (
				existingItem.price * existingItem.quantity
			).toFixed(2);
		} else {
			this.cart.push({ ...item, quantity: 1, totalPrice: item.price });
		}

		this.saveToLocalStorage();
	}),

	removeFromCart: action(function (itemId) {
		this.cart = this.cart.filter((item) => item.id !== itemId);
		this.saveToLocalStorage();
	}),

	updateQuantity: action(function (itemId, newQuantity) {
		const itemToUpdate = this.cart.find((item) => item.id === itemId);
		const newQ = parseFloat(newQuantity);

		if (itemToUpdate) {
			itemToUpdate.quantity = newQ;
			itemToUpdate.totalPrice = (itemToUpdate.price * newQ).toFixed(2);
		}

		this.saveToLocalStorage();
	}),

	updateQuantityByDirection: action(function (itemId, direction = 'minus') {
		const itemToUpdate = this.cart.find((item) => item.id === itemId);

		if (itemToUpdate) {
			if (direction === 'plus') {
				itemToUpdate.quantity += 1;
			} else if (direction === 'minus' && itemToUpdate.quantity > 1) {
				itemToUpdate.quantity -= 1;
			}

			itemToUpdate.totalPrice = (
				itemToUpdate.price * itemToUpdate.quantity
			).toFixed(2);
		}

		this.saveToLocalStorage();
	}),

	getTotalCount() {
		return this.cart.reduce((count, item) => count + item.quantity, 0);
	},

	saveToLocalStorage: action(function () {
		const cartData = toJS(this.cart);
		localStorage.setItem('cartData', JSON.stringify(cartData));
	}),

	loadFromLocalStorage: action(function () {
		const storedCartData = localStorage.getItem('cartData');

		if (storedCartData) {
			this.cart = JSON.parse(storedCartData);
		}

		// Load the discount from local storage
		this.loadDiscountFromLocalStorage();
	}),

	clearCart: action(function () {
		this.cart = [];
		this.saveToLocalStorage();
		this.setDiscount(0.0);
	}),

	getTotalPrice() {
		const totalPrice = this.cart.reduce(
			(total, item) => total + item.price * item.quantity, 0
		);

		// Subtract the discount from the total price
		const discountedTotal = totalPrice - this.discount;

		// Round the discounted total to 2 digits after the decimal point
		return discountedTotal.toFixed(2);
	},

	getTax() {
		const totalPrice = this.cart.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		);

		const tax = (totalPrice * settingStore.getTax()).toFixed(2);
		return parseFloat(tax);
	},

	getSubTotal() {
		const subTotal = this.getTotalPrice() - this.getTax();
		// Round the subTotal to 2 digits after the decimal point
		return subTotal.toFixed(2);
	},
});

cartStore.loadFromLocalStorage();

export default cartStore;
