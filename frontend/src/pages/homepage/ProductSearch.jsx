import { Input } from 'antd';
import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';

const ProductSearch = observer(() => {
	return (
		<Input
			placeholder="Search for a product"
			value={productsStore.searchQuery}
			onChange={(e) => productsStore.setSearchQuery(e.target.value)}
		/>
	);
});

export default ProductSearch;
