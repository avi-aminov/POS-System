import { useEffect, useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';

import {
	Table,
	Image,
	message,
	Button,
	Drawer,
	Form,
	Input
} from 'antd';

import {
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';

const CategoriesList = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const [categoryPopupVisible, setCategoryPopupVisible] = useState(false);


	useEffect(() => {
		categoriesStore.fetchCategories();
	}, []);

	//handle delete
	const handleDelete = async (record) => {
		console.log('delete product by id', record.id);
		message.success(dictionaryStore.getString('item_deleted_successfully'));
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
			dataIndex: 'id',
			render: (id, record) => (
				<div>
					<EditOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => {
							console.log("EditOutlined");
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

	const handleCategorySubmit = async (values) => {
		try {
			const data = { name: values.name, image: values.image };
			//const response = 
			await axios.post('/add-category', data);
			message.success(dictionaryStore.getString('category_added_successfully'));
			setCategoryPopupVisible(false);
		} catch (error) {
			console.error('Error adding category:', error);
			message.error(dictionaryStore.getString('error_adding_category'));
		}
	};

	return (
		<>
			<Drawer
				title={dictionaryStore.getString('add_new_category')}
				open={categoryPopupVisible}
				onClose={() => setCategoryPopupVisible(false)}
				width={400}
				placement="right"
				footer={null}
			>
				<Form layout="vertical" onFinish={handleCategorySubmit}>
					<Form.Item
						name="name"
						label={dictionaryStore.getString('category_name')}
						rules={[
							{
								required: true,
								message: dictionaryStore.getString('please_enter_the_category_name'),
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="image"
						label={dictionaryStore.getString('select_image')}
						rules={[
							{
								message: dictionaryStore.getString('please_enter_the_name'),
							},
						]}
					>
						<Input />
					</Form.Item>
					<Button type="primary" onClick={() => {
						console.log('setDrawerVisible');
					}}>
						{dictionaryStore.getString('select_image')}
					</Button>

					<div className="d-flex justify-content-end">
						<Button type="primary" htmlType="submit">
							{dictionaryStore.getString('add_category')}
						</Button>
					</div>
				</Form>
			</Drawer>
			<Button
				type="primary"
				onClick={() => setCategoryPopupVisible(true)}
			>
				{dictionaryStore.getString('add_category')}
			</Button>
			<Table
				rowKey="id"
				columns={cat_columns}
				dataSource={categoriesStore.categories}
				bordered
			/>
		</>
	);
});

export default CategoriesList;
