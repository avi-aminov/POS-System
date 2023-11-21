import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import Categories from './Categories';
import ProductSearch from './ProductSearch';
import Products from './Products';
import Cashier from './cashier/Cashier';
import { CategoriesAndProductSearchWrap, ProductWrap } from './Homepage.style';

const Homepage = observer(() => {
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

export default Homepage;
