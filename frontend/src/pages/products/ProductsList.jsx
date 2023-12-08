import axios from 'axios';
import { useEffect } from 'react';
import {
	DeleteOutlined,
	EditOutlined,
	SkinOutlined,
	SisternodeOutlined
} from '@ant-design/icons';
import {
	Drawer,
	Button,
	Table,
	message,
	Image,
	Tabs,
} from 'antd';

import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';
import ImageUploader from '../media/ImageUploader';
import CategoriesList from '../categories/CategoriesList';
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
		{ title: dictionaryStore.getString('name'), dataIndex: 'name' },
		{
			title: dictionaryStore.getString('image'),
			dataIndex: 'image',
			render: (image, record) => {
				return (
					image && <Image
						data-imgurl={image}
						width={60}
						alt={record.name}
						src={`${serverURL}/uploads/${image}`}
					/>
				);
			},
		},
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

	const tab_items = [
		{
			key: '1',
			label: (
				<span>
					<SkinOutlined />
					{dictionaryStore.getString('products_list')}
				</span>
			),
			children: (
				<>
					<Button type="primary" onClick={() => productsStore.setPopupModal(true)}>
						{dictionaryStore.getString('add_product')}
					</Button>
					<Table
						rowKey="_id"
						columns={columns}
						dataSource={productsStore.products}
						bordered
					/>
				</>
			),
		},
		{
			key: '2',
			label: (
				<span>
					<SisternodeOutlined />
					{dictionaryStore.getString('categories_list')}
				</span>
			),
			children: (
				<CategoriesList />
			),
		},
	];

	const onTabChange = (key) => {
		console.log(key);
	};

	const closeDrawer = () => {
		productsStore.setDrawerVisible(false);
	};

	return (
		<>
			<Drawer
				title="Image Uploader"
				width={'60%'}
				onClose={closeDrawer}
				open={productsStore.drawerVisible}
				style={{ zIndex: '9000' }}
			>
				<ImageUploader onClose={closeDrawer} />
			</Drawer>

			<Tabs
				defaultActiveKey="1"
				items={tab_items}
				onChange={onTabChange}
			/>

			{/* Replace Modal with Drawer */}
			<AddProductDrawer />
		</>
	);
});

export default ProductsList;
