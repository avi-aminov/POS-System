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

import { observer } from 'mobx-react';
import authStore from '../stores/authStore';
import dictionaryStore from '../stores/dictionaryStore';

const PosMenu = observer(() => {
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
				<Link to="/">{dictionaryStore.getString('home')}</Link>
			</Menu.Item>
			<Menu.Item key="/bills" icon={<CopyOutlined />}>
				<Link to="/bills">{dictionaryStore.getString('orders')}</Link>
			</Menu.Item>
			<Menu.Item key="/items" icon={<UnorderedListOutlined />}>
				<Link to="/items">{dictionaryStore.getString('items')}</Link>
			</Menu.Item>
			<Menu.Item key="/customers" icon={<UserOutlined />}>
				<Link to="/customers">{dictionaryStore.getString('customers')}</Link>
			</Menu.Item>
			<Menu.Item key="/media" icon={<PictureOutlined />}>
				<Link to="/media">{dictionaryStore.getString('media')}</Link>
			</Menu.Item>
			<Menu.Item
				key="/logout"
				icon={<LogoutOutlined />}
				onClick={logout}
			>
				{dictionaryStore.getString('logout')}
			</Menu.Item>
		</Menu>
	);
});

export default PosMenu;