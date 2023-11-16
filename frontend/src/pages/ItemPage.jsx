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
import productsStore from '../stores/productsStore';
import categoriesStore from '../stores/categoriesStore';
import settingsStore from '../stores/settingsStore';

import useImageModal from '../hooks/useImageModal';
import ImageSelectionModal from '../components/ImageSelectionModal';

const ItemPage = observer(() => {
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
			console.log('data', data);
			const response = await axios.post('/add-category', data);
			console.log(response.data);

			message.success('Category added successfully');
			setCategoryPopupVisible(false);
			// Add logic to refresh the category list if needed
		} catch (error) {
			console.error('Error adding category:', error);
			message.error('Error adding category');
		}
	};

	//handle deleet
	const handleDelete = async (record) => {
		console.log('delete product by id', record.id);
		message.success('Item Deleted Succesfully');
	};

	// handle form  submit
	const handleSubmit = async (value) => {
		if (editItem === null) {
			const data = { ...value, image: selectedImageUrl };
			console.log('add new product', data);

			try {
				const response = await axios.post('/add-product', data);
				console.log(response.data);
				setCategoryPopupVisible(false);
				message.success('Product added successfully');
			} catch (error) {
				console.error('Error adding category:', error);
				message.error('Error adding category');
			}
		} else {
			const data = { ...value, id: editItem.id, image: selectedImageUrl };

			try {
				const response = await axios.post('/update-product', data);
				console.log(response.data);
				setCategoryPopupVisible(false);
				message.success('Product updated successfully');
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
		{ title: 'Name', dataIndex: 'name' },
		{
			title: 'Image',
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
			title: 'Price',
			dataIndex: 'price',
			render: (id, record) =>
				`${record.price} ${settingsStore.settings.currencySymbol}`,
		},

		{
			title: 'Actions',
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
		{ title: 'Name', dataIndex: 'name' },
		{
			title: 'Image',
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
			title: 'Actions',
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
			label: 'Products List',
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
			label: 'Categories List',
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
			<Button type="primary" onClick={imageModal.openImageModal}>
				Select Image
			</Button>

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
						Add Product
					</Button>
					<Button
						type="primary"
						style={{ marginLeft: 16 }}
						onClick={() => setCategoryPopupVisible(true)}
					>
						Add Category
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
					title={`${
						editItem !== null ? 'Edit Product ' : 'Add New Product'
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
							label="Name"
							rules={[
								{
									required: true,
									message: 'Please enter the name',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item name="description" label="Description">
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							name="price"
							label="Price"
							rules={[
								{
									required: true,
									message: 'Please enter the price',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item name="newPrice" label="New Price">
							<Input />
						</Form.Item>
						<Form.Item
							name="stock"
							label="Stock"
							rules={[
								{
									required: true,
									message: 'Please enter the stock',
								},
							]}
						>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item name="barcode" label="Barcode">
							<Input />
						</Form.Item>

						<Form.Item
							label="Image URL"
							rules={[
								{
									required: true,
									message: 'Please select the image',
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
										Select Image
									</Button>
								}
							/>
						</Form.Item>

						<Form.Item
							name="categoryID"
							label="Category"
							rules={[
								{
									required: true,
									message: 'Please select the category',
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
								Add
							</Button>
						</div>
					</Form>
				</Drawer>
			)}

			<Drawer
				title="Add New Category"
				visible={categoryPopupVisible}
				onClose={() => setCategoryPopupVisible(false)}
				width={400}
				placement="right"
				footer={null}
			>
				<Form layout="vertical" onFinish={handleCategorySubmit}>
					<Form.Item
						name="name"
						label="Category Name"
						rules={[
							{
								required: true,
								message: 'Please enter the category name',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Image URL"
						rules={[
							{
								required: true,
								message: 'Please select the image',
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
									Select Image
								</Button>
							}
						/>
					</Form.Item>

					<div className="d-flex justify-content-end">
						<Button type="primary" htmlType="submit">
							Add Category
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	);
});

export default ItemPage;
