import { Input } from 'antd';
import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';
import dictionaryStore from '../../stores/dictionaryStore';

const ProductSearch = observer(() => {
	return (
		<Input
			placeholder={dictionaryStore.getString('search_for_a_product')}
			value={productsStore.searchQuery}
			onChange={(e) => productsStore.setSearchQuery(e.target.value)}
		/>
	);
});

export default ProductSearch;
