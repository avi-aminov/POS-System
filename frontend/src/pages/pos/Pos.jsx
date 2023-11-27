import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import Categories from '../categories/Categories';

import { CategoriesAndProductSearchWrap, ProductWrap } from './Pos.style';
import Products from '../products/Products';
import ProductSearch from '../products/ProductSearch';
import Cashier from './cashier/Cashier';

const Pos = observer(() => {
    return (
        <Row>
            <ProductWrap>
                <Col flex={3}>
                    <CategoriesAndProductSearchWrap>
                        <Categories />
                        <ProductSearch />
                    </CategoriesAndProductSearchWrap>
                    <Products />
                </Col>
            </ProductWrap>
            <Cashier />
        </Row>
    );
});

export default Pos;
