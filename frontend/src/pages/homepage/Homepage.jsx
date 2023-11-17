import { Row, Col } from 'antd';

import { observer } from 'mobx-react';
import Categories from './Categories';
import Products from './Products';
import ProductSearch from './ProductSearch';
import Cashier from './Cashier';

import { CategoriesWrap, ProductWrap } from './Homepage.style';

const Homepage = observer(() => {

	return (
		<Row>
			<ProductWrap>
				<Col flex={3}>
					<CategoriesWrap>
						<Categories />
						<ProductSearch />
					</CategoriesWrap>
					<Products />
				</Col>
			</ProductWrap>

			<Cashier />
		</Row>
	);
});

export default Homepage;
