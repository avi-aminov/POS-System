import { useEffect } from 'react';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import productsStore from '../../stores/productsStore';
import ItemList from './ProductItem';

const Products = observer(() => {
	useEffect(() => {
		productsStore.fetchProducts();
	}, []);

	return (
		<div
			className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4"
			style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
			{productsStore.products && productsStore.products
				.filter(
					(item) =>
						(item.categoryID === categoriesStore.selectedCategory ||
							categoriesStore.selectedCategory === 0) &&
						(item.name.toLowerCase().includes(productsStore.searchQuery.toLowerCase()) ||
							productsStore.searchQuery === ''),
				)
				.map((item) => (
					<div key={item._id} className="bg-white border">
						<ItemList key={item._id} item={item} />
					</div>
				))}
		</div>
	);
});

export default Products;
