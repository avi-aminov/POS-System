import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
	UserOutlined,
	LogoutOutlined,
	HomeOutlined,
	CopyOutlined,
	UnorderedListOutlined,
	PictureOutlined,
} from '@ant-design/icons';
import authStore from '../stores/authStore';

const PosMenu = () => {
	const navigate = useNavigate();

	const logout = () => {
		authStore.logout();
		navigate('/login');
	}

	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={window.location.pathname}
		>
			<Menu.Item key="/" icon={<HomeOutlined />}>
				<Link to="/">Home</Link>
			</Menu.Item>
			<Menu.Item key="/bills" icon={<CopyOutlined />}>
				<Link to="/bills">Bills</Link>
			</Menu.Item>
			<Menu.Item key="/items" icon={<UnorderedListOutlined />}>
				<Link to="/items">Items</Link>
			</Menu.Item>
			<Menu.Item key="/customers" icon={<UserOutlined />}>
				<Link to="/customers">Cutomers</Link>
			</Menu.Item>
			<Menu.Item key="/media" icon={<PictureOutlined />}>
				<Link to="/media">Media</Link>
			</Menu.Item>
			<Menu.Item
				key="/logout"
				icon={<LogoutOutlined />}
				onClick={logout}
			>
				Logout
			</Menu.Item>
		</Menu>
	);
};

export default PosMenu;
