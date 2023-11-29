import axios from 'axios';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
import useImageModal from '../../hooks/useImageModal';
import ImageSelectionModal from '../../components/ImageSelectionModal';

const ProductsList = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const [popupModal, setPopupModal] = useState(false);
	const [editItem, setEditItem] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState();
	const [categoryPopupVisible, setCategoryPopupVisible] = useState(false);
	const imageModal = useImageModal();

	//useEffect
	useEffect(() => {
		productsStore.fetchProducts();
		categoriesStore.fetchCategories();
	}, []);

	const handleCategorySubmit = async (values) => {
		try {
			const data = { name: values.name, image: selectedImageUrl };
			//const response = 
			await axios.post('/add-category', data);
			message.success(dictionaryStore.getString('category_added_successfully'));
			setCategoryPopupVisible(false);
		} catch (error) {
			console.error('Error adding category:', error);
			message.error(dictionaryStore.getString('error_adding_category'));
		}
	};

	//handle delete
	const handleDelete = async (record) => {
		console.log('delete product by id', record.id);
		message.success(dictionaryStore.getString('item_deleted_successfully'));
	};

	// handle form  submit
	const handleSubmit = async (value) => {
		if (editItem === null) {
			const data = { ...value, image: selectedImageUrl };
			try {
				const response = await axios.post('/add-product', data);
				console.log(response.data);
				setCategoryPopupVisible(false);
				message.success(dictionaryStore.getString('product_added_successfully'));
			} catch (error) {
				console.error('Error adding category:', error);
				message.error(dictionaryStore.getString('error_adding_category'));
			}
		} else {
			const data = { ...value, id: editItem.id, image: selectedImageUrl };

			try {
				const response = await axios.post('/update-product', data);
				console.log(response.data);
				setCategoryPopupVisible(false);
				message.success(dictionaryStore.getString('product_updated_successfully'));
			} catch (error) {
				message.error('Error updated category');
			}
		}
	};

	const handleImageSelect = (url) => {
		console.log('url:', url);
		setSelectedImageUrl(url);
	};

	//able data
	const columns = [
		{ title: dictionaryStore.getString('name'), dataIndex: 'name' },
		{
			title: dictionaryStore.getString('image'),
			dataIndex: 'image',
			render: (image, record) => {
				return (
					<Image
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
							setSelectedImageUrl(record.image);
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

	//able data
	const cat_columns = [
		{ title: dictionaryStore.getString('name'), dataIndex: 'name' },
		{
			title: dictionaryStore.getString('image'),
			dataIndex: 'image',
			render: (image, record) => (
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
			label: dictionaryStore.getString('products_list'),
			children: (
				<Table
					rowKey="id"
					columns={columns}
					dataSource={productsStore.products}
					bordered
				/>
			),
		},
		{
			key: '2',
			label: dictionaryStore.getString('categories_list'),
			children: (
				<Table
					rowKey="id"
					columns={cat_columns}
					dataSource={categoriesStore.categories}
					bordered
				/>
			),
		},
	];

	const onTabChange = (key) => {
		console.log(key);
	};

	return (
		<>
			<ImageSelectionModal
				open={imageModal.visible}
				onClose={imageModal.closeImageModal}
				handleImageSelect={(img) => {
					handleImageSelect(img);
				}}
			/>

			<div className="d-flex justify-content-between">
				<div></div>
				<div>
					<Button type="primary" onClick={() => setPopupModal(true)}>
						{dictionaryStore.getString('add_product')}
					</Button>
					<Button
						type="primary"
						style={{ marginLeft: 16 }}
						onClick={() => setCategoryPopupVisible(true)}
					>
						{dictionaryStore.getString('add_category')}
					</Button>
				</div>
			</div>

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
							label={dictionaryStore.getString('image_url')}
							rules={[
								{
									required: true,
									message: dictionaryStore.getString('please_select_the_image'),
								},
							]}
						>
							{selectedImageUrl}
							<Input
								value={selectedImageUrl}
								addonAfter={
									<Button
										type="primary"
										onClick={imageModal.openImageModal}
									>
										{dictionaryStore.getString('select_image')}
									</Button>
								}
							/>
						</Form.Item>

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
						label={dictionaryStore.getString('image_url')}
						rules={[
							{
								required: true,
								message: dictionaryStore.getString('please_select_the_image'),
							},
						]}
					>
						{selectedImageUrl}
						<Input
							value={selectedImageUrl}
							addonAfter={
								<Button
									type="primary"
									onClick={imageModal.openImageModal}
								>
									{dictionaryStore.getString('select_image')}
								</Button>
							}
						/>
					</Form.Item>

					<div className="d-flex justify-content-end">
						<Button type="primary" htmlType="submit">
							{dictionaryStore.getString('add_category')}
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	);
});

export default ProductsList;
