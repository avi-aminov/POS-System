import { useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import DataTable from 'react-data-table-component';
import productsStore from '../../stores/productsStore';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';
import AddProductDrawer from './AddProductDrawer';
import categoriesStore from '../../stores/categoriesStore';
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import ToastService from '../../components/Toast/ToastService';
import MagnifierUtils from '../../components/Magnifier/MagnifierUtils';
import ModalOpener from '../../components/ModalConfirmation/ModalOpener';

const ProductsList = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;
	const Toast = ToastService();

	// useEffect
	useEffect(() => {
		productsStore.fetchProducts();
		categoriesStore.fetchCategories();
	}, []);

	// handle delete
	const handleDelete = async (record) => {
		try {
			// Make a POST request to update the product isDelete status
			const response = await axios.post(`/delete-product/${record._id}`);

			// Check the response status
			if (response.status === 200) {
				console.log('Product isDelete updated successfully:', response.data);
				productsStore.fetchProducts();
				// Handle success, if needed
				Toast.success(dictionaryStore.getString('item_deleted_successfully'));
			} else {
				console.error('Unexpected response:', response);
				Toast.error('Error product delete');
			}
		} catch (error) {
			console.error('Error updating product isDelete:', error);
			Toast.error('Error product delete');
		}
	};

	// table data
	const columns = [
		{
			name: dictionaryStore.getString('image'),
			selector: (row) => row.image,
			cell: (record) => (
				<img
					onClick={() => {
						MagnifierUtils.open(`${serverURL}/uploads/${record.image}`)
					}}
					className='cursor-pointer p-2'
					width={60}
					alt={record.name}
					src={`${serverURL}/uploads/${record.image}`}
				/>
			),
		},
		{ name: dictionaryStore.getString('name'), selector: (row) => row.name },
		{
			name: dictionaryStore.getString('price'),
			selector: (row) => row.price,
			cell: (record) => `${record.price} ${settingsStore.settings.currencySymbol}`,
		},
		{
			name: dictionaryStore.getString('actions'),
			selector: (row) => row._id,
			cell: (record) => (
				<div className='flex gap-2'>
					<GrEdit
						size={20}
						style={{ cursor: 'pointer' }}
						onClick={() => {
							productsStore.updateEditItem(record);
							productsStore.isEditItem = true;
							productsStore.setPopupModal(true);
						}}
					/>
					<ModalOpener
						onConfirm={(record) => {
							console.log('Confirmed!', record);
							handleDelete(record);
						}}
						onClose={() => {
							console.log('Cancel');
						}}
						openerContent={<RiDeleteBin5Line style={{ cursor: 'pointer' }} size={20} color='red' />}
						record={record} // Pass the record prop here
					/>
				</div>
			),
		},
	];

	return (
		<div style={{ height: 'calc(100vh)', overflow: 'auto' }} className="content overflow-y-auto">
			<div className="p-8" style={{ width: 'calc(100%)', paddingLeft: 'calc(80px + 2rem)' }}>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" type="primary"
					onClick={() => {
						productsStore.updateEditItem({});
						productsStore.setPopupModal(true);
					}}>
					{dictionaryStore.getString('add_product')}
				</button>

				<DataTable pagination columns={columns} data={productsStore.products} />
				<AddProductDrawer />

			</div>
			{Toast.ToastComponent}
		</div>
	);
});

export default ProductsList;
