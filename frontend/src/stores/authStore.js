//import axios from 'axios';
import axios from 'axios';
import { observable, action } from 'mobx';
//toJS

const authStore = observable({
	isLogin: null,

	setLoginStatus: action(function (newData) {
		this.isLogin = newData;
	}),

	checkAuth: action(async function () {
		try {
			await axios.get('check-auth');
			this.isLogin = true;
		} catch (e) {
			this.isLogin = false;
			console.log('error: ', e);
		}
	}),

	logout: action(async function () {
		try {
			await axios.get('/logout');
			this.isLogin = false;
		} catch (e) {
			console.log('error: ', e);
		}
	}),
});

export default authStore;
