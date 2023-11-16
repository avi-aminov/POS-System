import { Row, Col } from 'antd';
import Cashier from '../Cashier';
import { observer } from 'mobx-react';
import Categories from './Categories';
import Products from './Products';
import ProductSearch from './ProductSearch';
import '../../App.css';

const Homepage = observer(() => {
	const maxW7 = {
		maxWidth: '65%',
	};

	return (
		<Row>
			<Col style={maxW7} flex={3}>
				<div style={{ padding: '10px 0' }}>
					<Categories />
					<ProductSearch />
				</div>
				<Products />
			</Col>
			<Cashier />
		</Row>
	);
});

export default Homepage;
