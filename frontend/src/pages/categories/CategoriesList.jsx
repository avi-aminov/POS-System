import { useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';

import {
	Drawer,
	Table,
	Image,
	message,
	Button,
} from 'antd';

import {
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import AddCategoryDrawer from './AddCategoryDrawer';
import ImageUploader from '../media/ImageUploader';

const CategoriesList = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	useEffect(() => {
		categoriesStore.fetchCategories();
	}, []);

	//handle delete
	const handleDelete = async (record) => {
		try {
			// Make a POST request to update the product isDelete status
			const response = await axios.post(`/delete-category/${record._id}`);

			// Check the response status
			if (response.status === 200) {
				console.log('Category isDelete updated successfully:', response.data);
				categoriesStore.fetchCategories();
				message.success(dictionaryStore.getString('item_deleted_successfully'));
			} else {
				console.error('Unexpected response:', response);
				message.error('Category delete failed');
			}
		} catch (error) {
			console.error('Error updating product isDelete:', error);
			message.error('Category delete failed');
		}
	};

	//able data
	const cat_columns = [
		{ title: dictionaryStore.getString('name'), dataIndex: 'name' },
		{
			title: dictionaryStore.getString('image'),
			dataIndex: 'image',
			render: (image, record) => (
				image &&
				<Image
					width={60}
					alt={record.name}
					src={`${serverURL}/uploads/${image}`}
				/>
			),
		},
		{
			title: dictionaryStore.getString('action'),
			dataIndex: '_id',
			render: (_id, record) => (
				<div>
					<EditOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => {
							categoriesStore.setEditItem(record);
							categoriesStore.setCategoryPopupVisible(true)
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

	const closeDrawer = () => {
		categoriesStore.setDrawerVisible(false);
	};

	return (
		<>
			<Drawer
				title="Image Uploader"
				width={'60%'}
				onClose={closeDrawer}
				open={categoriesStore.drawerVisible}
				style={{ zIndex: '9000' }}
			>
				<ImageUploader onClose={closeDrawer} />
			</Drawer>

			<AddCategoryDrawer />
			<Button
				type="primary"
				onClick={() => categoriesStore.setCategoryPopupVisible(true)}
			>
				{dictionaryStore.getString('add_category')}
			</Button>

			<Table
				dataSource={categoriesStore.categories.map(item => ({ ...item, key: item._id }))}
				columns={cat_columns}
				bordered
			/>
		</>
	);
});

export default CategoriesList;
