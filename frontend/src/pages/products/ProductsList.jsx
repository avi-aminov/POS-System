import axios from 'axios';
import { useEffect } from 'react';
import {
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import {
	//Drawer,
	Button,
	Table,
	message,
	Image,
} from 'antd';

import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';
//import ImageUploader from '../media/ImageUploader';
import AddProductDrawer from './AddProductDrawer';
import categoriesStore from '../../stores/categoriesStore';

const ProductsList = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	//useEffect
	useEffect(() => {
		productsStore.fetchProducts();
		categoriesStore.fetchCategories();
	}, []);

	//handle delete
	const handleDelete = async (record) => {
		try {
			// Make a POST request to update the product isDelete status
			const response = await axios.post(`/delete-product/${record._id}`);

			// Check the response status
			if (response.status === 200) {
				console.log('Product isDelete updated successfully:', response.data);
				productsStore.fetchProducts();
				// Handle success, if needed

				message.success(dictionaryStore.getString('item_deleted_successfully'));
			} else {
				console.error('Unexpected response:', response);
				// Handle unexpected response, if needed
				message.error('Error product delete');
			}
		} catch (error) {
			console.error('Error updating product isDelete:', error);
			// Handle error, if needed
			message.error('Error product delete');
		}
	};

	//able data
	const columns = [
		{
			title: dictionaryStore.getString('image'),
			dataIndex: 'image',
			render: (image, record) => {
				return (
					image && <Image
						data-imgurl={image}
						width={40}
						alt={record.name}
						src={`${serverURL}/uploads/${image}`}
					/>
				);
			},
		},
		{ title: dictionaryStore.getString('name'), dataIndex: 'name' },
		{
			title: dictionaryStore.getString('price'),
			dataIndex: 'price',
			render: (_id, record) =>
				`${record.price} ${settingsStore.settings.currencySymbol}`,
		},
		{
			title: dictionaryStore.getString('actions'),
			dataIndex: '_id',
			render: (_id, record) => (
				<div>
					<EditOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => {
							productsStore.setEditItem(record);
							productsStore.setPopupModal(true)
						}}
					/>
					<DeleteOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => {
							handleDelete(record);
						}}
					/>
				</div>
			),
		},
	];

	return (
		<div style={{ padding: '15px' }}>
			<Button type="primary" onClick={() => productsStore.setPopupModal(true)}>
				{dictionaryStore.getString('add_product')}
			</Button>
			<Table
				dataSource={productsStore.products.map(item => ({ ...item, key: item._id }))}
				columns={columns}
				bordered
				pagination={{
					pageSize: 20,
				}}
			/>
			<AddProductDrawer />
		</div>
	);
});

export default ProductsList;
