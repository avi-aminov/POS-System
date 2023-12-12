import { useState } from 'react';
import { Input } from 'antd';
import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';
import dictionaryStore from '../../stores/dictionaryStore';
import { BarcodeOutlined, PlusSquareOutlined } from '@ant-design/icons';
import cartStore from '../../stores/cartStore';
import ModalForGetParameter from '../../components/ModalForGetParameter';
import { generateRandomID } from '../../utils/Utility';

const ProductSearch = observer(() => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const handleModalOk = (inputValue) => {
		const globalProduct = {
			_id: generateRandomID(), // You can use a unique identifier
			name: dictionaryStore.getString('global'),
			price: inputValue,
			quantity: 1,
			totalPrice: inputValue,
			// Add other parameters as needed
		};

		cartStore.addToCart(globalProduct)
		setModalVisible(false);
	};

	return (
		<div style={{ display: 'flex' }}>
			<Input
				style={{ margin: '0 10px' }}
				placeholder={dictionaryStore.getString('search_for_a_product')}
				value={productsStore.searchQuery}
				onChange={(e) => productsStore.setSearchQuery(e.target.value)}
			/>
			<div style={{ display: 'flex' }}>
				<BarcodeOutlined
					style={{ cursor: 'pointer' }}
					onClick={() => {
						console.log('BarcodeOutlined');
					}}
				/>
				<PlusSquareOutlined
					style={{ cursor: 'pointer' }}
					onClick={handleOpenModal}
				/>
				<ModalForGetParameter
					title={dictionaryStore.getString('add_product_price')}
					visible={modalVisible}
					onCancel={handleCloseModal}
					onOk={handleModalOk}
				/>
			</div>
		</div>
	);
});

export default ProductSearch;
