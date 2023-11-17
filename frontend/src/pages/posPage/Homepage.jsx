import { Row, Col } from 'antd';
import Cashier from '../homepage/Cashier';
import { observer } from 'mobx-react';
import Categories from './Categories';
import Products from './Products';
import ProductSearch from './ProductSearch';
import '../../App.css';
import { CategoriesWrap } from './Homepage.style';

const Homepage = observer(() => {
	const maxW7 = {
		maxWidth: '65%',
	};

	return (
		<Row>
			<Col style={maxW7} flex={3}>
				<CategoriesWrap>
					<Categories />
					<ProductSearch />
				</CategoriesWrap>
				<Products />
			</Col>
			<Cashier />
		</Row>
	);
});

export default Homepage;
