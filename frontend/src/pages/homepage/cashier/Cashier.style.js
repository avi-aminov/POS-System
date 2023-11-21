import styled from 'styled-components';
import { Row } from 'antd';

export const TableHeaderRow = styled(Row)`
    background-color: #f0f0f0;
    padding: 10px;
    font-weight: bold;
  
    margin-left: 0!important;
    margin-right: 0!important;
`;

export const OrderPosWrap = styled.div`
    flex: 2 2 auto;
    max-width: 39%;
    margin-left: 1%;
    
    @media (max-width: 900px) {
        max-width: 100%;
    }

    .ant-col{
        position: sticky;
        top: 0;
    }
`;

export const RightSideWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 24px);
`;

export const RightSideHeader = styled.div`
    height: 140px;
`;

export const CashierProductsWrap = styled.div`
    height: calc(100vh - 300px);
    flex: 1;
    overflow: auto;
`;

