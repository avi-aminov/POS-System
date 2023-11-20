import styled from 'styled-components';
import { Row, Col } from 'antd';

export const PlusMinusWrap = styled(Row)`
  display: flex;
  flex-flow: column;

  span{
    svg{
      margin: 0!important;
      height: 18px!important;
      width: 18px!important;
    }
  }
  
`;

export const TableRow = styled(Row)`
  border-bottom: 1px solid #e8e8e8;
  padding: 10px;
`;

export const ItemCol = styled(Col)`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  position: relative;
  display: inline-block;
  width: 2.1875rem;
  height: 2.1875rem;
  border-radius: 0.3125rem;
`;

export const Title = styled.h5`
  font-size: 14px;
  margin-left: 10px;
`;

export const QuantityCol = styled(Col)`
  display: flex;
  align-items: center;
`;

export const PriceCol = styled(Col)`
  display: flex;
  align-items: center;
`;

export const DeleteCol = styled(Col)`
  display: flex;
  align-items: center;
`;