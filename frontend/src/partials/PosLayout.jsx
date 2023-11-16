import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

import PosMenu from './PosMenu';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	SettingOutlined,
} from '@ant-design/icons';

import { SiteLayout } from './PosLayout.style';
//import Spinner from '../components/Spinner';

const { Header, Sider, Content } = Layout;

const DefaultLayout = observer(() => {
	const [collapsed, setCollapsed] = useState(false);

	const toggle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<SiteLayout>
			<Layout>
				{/*loading && <Spinner />*/}
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<div className="logo">
						<h1 className="text-center text-light font-wight-bold mt-4">
							POS
						</h1>
					</div>
					<PosMenu />
				</Sider>
				<Layout className="site-layout">
					<Header
						className="site-layout-background"
						style={{ padding: 0 }}
					>
						{React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: 'trigger',
								onClick: toggle,
							},
						)}
						<div style={{ marginRight: '15px', cursor: 'pointer' }}>
							<SettingOutlined />
						</div>
					</Header>
					<Content
						className="site-layout-background"
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</SiteLayout>
	);
});

export default DefaultLayout;
