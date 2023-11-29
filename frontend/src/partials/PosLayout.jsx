import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import PosMenu from './PosMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { LeftSideBarBurgerWrap, SiteLayout } from './PosLayout.style';
import settingsStore from '../stores/settingsStore';

const { Sider, Content } = Layout;

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

	const getSideBar = () => {
		return (
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<LeftSideBarBurgerWrap>
					{renderCollapsedButton()}
				</LeftSideBarBurgerWrap>
				<PosMenu />
			</Sider>
		);
	}

	return (
		<SiteLayout direction={settingsStore.settings.direction}>
			<Layout>
				{settingsStore.settings.direction === 'ltr' && getSideBar()}
				<Layout className="site-layout">
					<Content className="site-layout-background">
						<Outlet />
					</Content>
				</Layout>
				{settingsStore.settings.direction === 'rtl' && getSideBar()}
			</Layout>
		</SiteLayout>
	);
});

export default DefaultLayout;
