import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

const Register = () => {
	const navigate = useNavigate();

	const handleSubmit = async (value) => {
		const { email, password, name } = value;

		if (!email || !password || !name) {
			message.error('One or more of the parameters are empty');
		} else {
			try {
				await axios.post('/registration', value);
				message.success('Register Successfully');
				navigate('/login');
			} catch (error) {
				message.error('Something Went Wrong');
			}
		}
	};

	return (
		<div
			className="register"
			style={{ maxWidth: '400px', margin: 'auto', marginTop: '35px' }}
		>
			<div className="register-form">
				<h1>POS System</h1>
				<h3>Registration</h3>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Form.Item name="name" label="Name">
						<Input />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<Input />
					</Form.Item>
					<Form.Item name="password" label="Password">
						<Input type="password" />
					</Form.Item>

					<div className="d-flex justify-content-between">
						<p>
							Already Register Please
							<Link to="/login"> Login Here !</Link>
						</p>
						<Button type="primary" htmlType="submit">
							Register
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Register;
