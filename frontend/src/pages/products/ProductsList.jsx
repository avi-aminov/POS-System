import axios from 'axios';
import { useEffect, useState } from 'react';
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
	Form,
	Input,
	Select,
	message,
	Image,
	InputNumber,
	Tabs,
} from 'antd';

import { observer } from 'mobx-react';
import productsStore from '../../stores/productsStore';
import categoriesStore from '../../stores/categoriesStore';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';
import ImageUploader from '../media/ImageUploader';
import CategoriesList from '../categories/CategoriesList';

const ProductsList = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;
	const [popupModal, setPopupModal] = useState(false);
	const [editItem, setEditItem] = useState(null);

	//useEffect
	useEffect(() => {
		productsStore.fetchProducts();
	}, []);

	//handle delete
	const handleDelete = async (record) => {
		console.log('delete product by id', record.id);
		message.success(dictionaryStore.getString('item_deleted_successfully'));
	};

	// handle form  submit
	const handleSubmit = async (value) => {
		if (editItem === null) {
			const data = { ...value };
			try {
				await axios.post('/add-product', data);
				//setCategoryPopupVisible(false);
				message.success(dictionaryStore.getString('product_added_successfully'));
			} catch (error) {
				console.error('Error adding category:', error);
				message.error(dictionaryStore.getString('error_adding_category'));
			}
		} else {
			const data = { ...value, id: editItem.id };

			try {
				await axios.post('/update-product', data);
				//setCategoryPopupVisible(false);
				message.success(dictionaryStore.getString('product_updated_successfully'));
			} catch (error) {
				message.error('Error updated category');
			}
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
			render: (id, record) =>
				`${record.price} ${settingsStore.settings.currencySymbol}`,
		},

		{
			title: dictionaryStore.getString('actions'),
			dataIndex: 'id',
			render: (id, record) => (
				<div>
					<EditOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => {
							setEditItem(record);
							setPopupModal(true);
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
					<Button type="primary" onClick={() => setPopupModal(true)}>
						{dictionaryStore.getString('add_product')}
					</Button>
					<Table
						rowKey="id"
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


	const [drawerVisible, setDrawerVisible] = useState(false);

	const showDrawer = () => {
		setDrawerVisible(true);
	};

	const closeDrawer = () => {
		setDrawerVisible(false);
	};

	return (
		<>
			<Drawer
				title="Image Uploader"
				width={'60%'}
				onClose={closeDrawer}
				open={drawerVisible}
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
			{popupModal && (
				<Drawer
					title={`${editItem !== null ?
						dictionaryStore.getString('edit_product') :
						dictionaryStore.getString('add_new_product')
						}`}
					open={popupModal}
					onClose={() => {
						setEditItem(null);
						setPopupModal(false);
					}}
					width={400} // Set the width according to your design
					placement="right" // Adjust placement as needed
					footer={null} // Remove footer if not needed
				>
					<Form
						layout="vertical"
						initialValues={editItem}
						onFinish={handleSubmit}
					>
						<Form.Item
							name="name"
							label={dictionaryStore.getString('name')}
							rules={[
								{
									required: true,
									message: dictionaryStore.getString('please_enter_the_name'),
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="description"
							label={dictionaryStore.getString('description')}>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							name="price"
							label={dictionaryStore.getString('price')}
							rules={[
								{
									required: true,
									message: dictionaryStore.getString('please_enter_the_price'),
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item name="newPrice" label={dictionaryStore.getString('new_price')}>
							<Input />
						</Form.Item>
						<Form.Item
							name="stock"
							label={dictionaryStore.getString('stock')}
							rules={[
								{
									required: true,
									message: dictionaryStore.getString('please_enter_the_stock'),
								},
							]}
						>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item name="barcode" label={dictionaryStore.getString('barcode')}>
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
						<Button type="primary" onClick={showDrawer}>
							{dictionaryStore.getString('select_image')}
						</Button>

						<Form.Item
							name="categoryID"
							label={dictionaryStore.getString('category')}
							rules={[
								{
									required: true,
									message: dictionaryStore.getString('please_select_the_category'),
								},
							]}
						>
							<Select>
								{categoriesStore.categories &&
									categoriesStore.categories.map((item) => (
										<Select.Option
											value={item.id}
											key={item.id}
										>
											{item.name}
										</Select.Option>
									))}
							</Select>
						</Form.Item>

						<div className="d-flex justify-content-end">
							<Button type="primary" htmlType="submit">
								{dictionaryStore.getString('add')}
							</Button>
						</div>
					</Form>
				</Drawer>
			)}
		</>
	);
});

export default ProductsList;
