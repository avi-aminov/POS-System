import { useState } from 'react';
import { observer } from 'mobx-react';
import { FaBarcode } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import { generateRandomID } from '../../utils/Utility';
import productsStore from '../../stores/productsStore';
import dictionaryStore from '../../stores/dictionaryStore';
import cartStore from '../../stores/cartStore';
import ModalForGetParameter from '../../components/ModalForGetParameter';

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
		};

		cartStore.addToCart(globalProduct);
		setModalVisible(false);
	};

	return (
		<div className="flex items-center">
			<input
				className="m-2 p-2 border border-gray-300"
				type="text"
				placeholder={dictionaryStore.getString('search_for_a_product')}
				value={productsStore.searchQuery}
				onChange={(e) => productsStore.setSearchQuery(e.target.value)}
			/>
			<div className="flex">
				<FaBarcode
					size={26}
					className="cursor-pointer m-2 text-xl"
					onClick={() => {
						console.log('BarcodeOutlined');
					}}
				/>
				<LuPackagePlus
					size={26}
					className="cursor-pointer m-2 text-xl"
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
