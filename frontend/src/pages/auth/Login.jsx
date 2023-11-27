import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import authStore from '../../stores/authStore';

const Login = () => {
	const navigate = useNavigate();

	const handleSubmit = async (value) => {
		const { password, email } = value;

		if (!password || !email) {
			message.error('One or more of the parameters are empty');
		} else {
			try {
				const res = await axios.post('/login', value);
				console.log('res:', res);
				authStore.setLoginStatus(true);
				navigate('/');
			} catch (error) {
				message.error('Something Went Wrong');
				console.log(error);
			}
		}
	};

	return (
		<div
			className="register"
			style={{ maxWidth: '400px', margin: 'auto', marginTop: '35px' }}
		>
			<div className="regsiter-form">
				<h1>POS System</h1>
				<h3>Login</h3>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Form.Item name="email" label="Email">
						<Input />
					</Form.Item>
					<Form.Item name="password" label="Password">
						<Input type="password" />
					</Form.Item>

					<div className="d-flex justify-content-between">
						<p>
							not a user Please
							<Link to="/register"> Register Here !</Link>
						</p>
						<Button type="primary" htmlType="submit">
							Login
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Login;
