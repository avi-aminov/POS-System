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

import { SettingBtnWrap, SiteLayout, Title } from './PosLayout.style';

const { Header, Sider, Content } = Layout;

const DefaultLayout = observer(() => {
	const [collapsed, setCollapsed] = useState(false);

	const toggle = () => {
		setCollapsed(!collapsed);
	};

	const renderCollapsedButton = () => {
		return React.createElement(
			collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
			{
				className: 'trigger',
				onClick: toggle,
			},
		)
	};

	return (
		<SiteLayout>
			<Layout>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<Title>POS</Title>
					<PosMenu />
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background">
						{renderCollapsedButton()}
						<SettingBtnWrap>
							<SettingOutlined />
						</SettingBtnWrap>
					</Header>
					<Content className="site-layout-background">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</SiteLayout>
	);
});

export default DefaultLayout;
