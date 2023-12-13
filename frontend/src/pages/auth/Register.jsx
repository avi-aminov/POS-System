import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToastService from '../../components/Toast/ToastService';

const Register = () => {
	const navigate = useNavigate();
	const Toast = ToastService();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password, name } = formData;

		if (!email || !password || !name) {
			Toast.error('One or more of the parameters are empty');
		} else {
			try {
				await axios.post('/registration', formData);
				Toast.success('Register Successfully');
				navigate('/login');
			} catch (error) {
				Toast.error('Something Went Wrong');
			}
		}
	};

	return (
		<>
			<div className="register max-w-md mx-auto mt-10 p-6 bg-white border rounded-md shadow-md">
				<div className="register-form">
					<h1 className="text-2xl font-bold mb-4">POS System</h1>
					<h3 className="text-lg font-semibold mb-4">Registration</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-sm font-medium text-gray-600">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="mt-1 p-2 w-full border rounded-md"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-600">
								Email
							</label>
							<input
								required
								type="email"
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
								required
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
								Already registered?{' '}
								<Link to="/login" className="text-blue-500 hover:underline">
									Login Here!
								</Link>
							</p>
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
			{Toast.ToastComponent}
		</>
	);
};

export default Register;
