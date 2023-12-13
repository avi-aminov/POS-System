import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authStore from '../../stores/authStore';
import ToastService from '../../components/Toast/ToastService';

const Login = () => {
	const navigate = useNavigate();
	const Toast = ToastService();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { password, email } = formData;

		if (!password || !email) {
			Toast.error('One or more of the parameters are empty');
		} else {
			try {
				await axios.post('/login', formData);
				authStore.setLoginStatus(true);
				navigate('/');
			} catch (error) {
				Toast.error('Something Went Wrong');
				console.log(error);
			}
		}
	};

	return (
		<>
			<div className="register max-w-md mx-auto mt-8 p-6 bg-white border rounded-md shadow-md">
				<div className="login-form">
					<h1 className="text-2xl font-bold mb-4">POS System</h1>
					<h3 className="text-xl font-semibold mb-4">Login</h3>
					<form onSubmit={handleSubmit} className="mt-4 space-y-4">
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-600">
								Email
							</label>
							<input
								type="text"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="mt-1 p-2 w-full border rounded-md"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="block text-sm font-medium text-gray-600">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="mt-1 p-2 w-full border rounded-md"
							/>
						</div>
						<div className="flex justify-between items-center">
							<p>
								Not a user? Please{' '}
								<Link to="/register" className="text-blue-500 hover:underline">
									Register Here!
								</Link>
							</p>
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
			{Toast.ToastComponent}
		</>
	);
};

export default Login;
