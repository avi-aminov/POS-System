import { useEffect } from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import productsStore from '../../stores/productsStore';
import ItemList from './ProductItem';

const Products = observer(() => {
	useEffect(() => {
		productsStore.fetchProducts();
	}, []);

	return (
		<Row>
			{productsStore.products && productsStore.products
				.filter(
					(item) =>
						(item.categoryID === categoriesStore.selectedCategory ||
							categoriesStore.selectedCategory === 0) &&
						(item.name.toLowerCase().includes(productsStore.searchQuery.toLowerCase()) ||
							productsStore.searchQuery === ''),
				)
				.map((item) => (
					<Col key={item.id} xs={24} lg={6} md={12} sm={6}>
						<ItemList key={item.id} item={item} />
					</Col>
				))}
		</Row>
	);
});

export default Products;
