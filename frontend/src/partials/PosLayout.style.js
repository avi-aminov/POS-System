import styled from 'styled-components';

export const Title = styled.h1`
	text-align: center;
    color: #fff;
    padding: 20px 0 20px 0;
`;

export const SettingBtnWrap = styled.div`
	margin-right: 15px; 
	cursor: pointer;
`;

export const StyledCartItem = styled.div`
	padding-left: 20px;
	padding-right: 30px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	flex-flow: row;
`;

export const StyledCartText = styled.p`
	margin-top: 10px;
	font-weight: bold;
`;

export const SiteLayout = styled.div`
	.site-layout .site-layout-background {
		padding: 0;
		background: #fff;
		box-shadow: 0 0 3px #ccc;
		margin: 0px 10px;
		overflow: auto;

		&.ant-layout-content {
			margin: 24px 16px;
			padding: 24px;
			minHeight: 280px
		}
	}

	.ant-layout-has-sider {
		padding: 5px !important;
	}

	.ant-layout.ant-layout-has-sider {
		height: 100vh;
	}

	.anticon svg {
		height: 20px;
		width: 20px;
		font-size: 20px;
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	.ant-layout-header {
		line-height: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.ant-layout-content {
		margin: 10px 10px !important;
	}
`;
