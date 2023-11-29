import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
	UserOutlined,
	LogoutOutlined,
	HomeOutlined,
	CopyOutlined,
	UnorderedListOutlined,
	PictureOutlined,
	ControlOutlined,
	//AreaChartOutlined
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

	const getItem = (label, key, icon, children, type) => {
		return {
			key,
			icon,
			children,
			label,
			type,
		};
	}

	const items = [
		getItem(<Link to="/">{dictionaryStore.getString('pos')}</Link>, '/', <HomeOutlined />),
		getItem(<Link to="/orders">{dictionaryStore.getString('orders')}</Link>, '/orders', <CopyOutlined />),
		getItem(<Link to="/items">{dictionaryStore.getString('items')}</Link>, '/items', <UnorderedListOutlined />),
		getItem(<Link to="/customers">{dictionaryStore.getString('customers')}</Link>, '/customers', <UserOutlined />),
		getItem(<Link to="/media">{dictionaryStore.getString('media')}</Link>, '/media', <PictureOutlined />),
		getItem(<Link to="/settings">{dictionaryStore.getString('settings')}</Link>, '/settings', <ControlOutlined />),
		getItem(<div onClick={logout}>{dictionaryStore.getString('logout')}</div>, '/logout', <LogoutOutlined />),
	];

	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={[window.location.pathname]}
			selectedKeys={[window.location.pathname]} // Add this line to fix the warning
			items={items}
		/>
	);
});

export default PosMenu;
