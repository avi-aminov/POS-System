import { Input } from 'antd';
import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';
import dictionaryStore from '../../stores/dictionaryStore';
import { BarcodeOutlined, PlusSquareOutlined } from '@ant-design/icons';

const ProductSearch = observer(() => {
	return (
		<div style={{ display: 'flex' }}>
			<Input
				placeholder={dictionaryStore.getString('search_for_a_product')}
				value={productsStore.searchQuery}
				onChange={(e) => productsStore.setSearchQuery(e.target.value)}
			/>

			<div style={{ display: 'flex' }}>
				<BarcodeOutlined
					style={{ cursor: 'pointer' }}
					onClick={() => {
						console.log('UserAddOutlined');
					}}
				/>
				<PlusSquareOutlined
					style={{ cursor: 'pointer' }}
					onClick={() => {
						console.log('PlusCircleOutlined');
					}}
				/>
			</div>

		</div>
	);
});

export default ProductSearch;
