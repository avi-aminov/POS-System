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
	Modal,
} from 'antd';

import { observer } from 'mobx-react';
import productsStore from '../stores/productsStore';
import categoriesStore from '../stores/categoriesStore';
import settingsStore from '../stores/settingsStore';
import axios from 'axios';

const ItemPage = observer(() => {
	const serverURL = 'http://localhost:3003';

	const [popupModal, setPopupModal] = useState(false);
	const [editItem, setEditItem] = useState(null);
	const [imageList, setImageList] = useState([]);
	const [selectedImageUrl, setSelectedImageUrl] = useState('');
	const [imageModalVisible, setImageModalVisible] = useState(false);

	const [categoryPopupVisible, setCategoryPopupVisible] = useState(false);

	//useEffect
	useEffect(() => {
		productsStore.fetchProducts();
		categoriesStore.fetchCategories();

		// Fetch the list of images when the component mounts
		fetchImageList();
	}, []);

	const handleCategorySubmit = async (values) => {
		try {
			// Add logic to save the new category to the server using axios or any other method
			// For example:
			const response = await axios.post('/add-category', values);
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

	const fetchImageList = async () => {
		try {
			const response = await axios.get('/images');
			setImageList(response.data);
		} catch (error) {
			console.error('Error fetching image list:', error);
		}
	};

	// handle form  submit
	const handleSubmit = async (value) => {
		if (editItem === null) {
			console.log('add new product', value);
			message.success('add new product');
		} else {
			console.log('update product', value);
			message.success('update product');
		}
	};

	const handleImageSelect = (url) => {
		setSelectedImageUrl(url);
		console.log('url:', url);
		//setPopupModal(false);
		closeImageModal();
	};

	const openImageModal = () => {
		setImageModalVisible(true);
	};

	const closeImageModal = () => {
		setImageModalVisible(false);
	};

	//able data
	const columns = [
		{ title: 'Name', dataIndex: 'name' },
		{
			title: 'Image',
			dataIndex: 'image',
			render: (image, record) => (
				<Image width={60} alt={record.fName} src={image} />
			),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: (id, record) =>
				`${record.price} ${settingsStore.settings.currencySymbol}`,
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

	return (
		<>
			<div className="d-flex justify-content-between">
				<h1>Products List</h1>
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

			<Table
				rowKey="id"
				columns={columns}
				dataSource={productsStore.products}
				bordered
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
							name="image"
							label="Image URL"
							rules={[
								{
									required: true,
									message: 'Please select the image',
								},
							]}
						>
							<Input
								value={selectedImageUrl}
								addonAfter={
									<Button
										type="primary"
										onClick={openImageModal}
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

			<Modal
				title="Select Image"
				visible={imageModalVisible}
				onCancel={closeImageModal}
				footer={null}
			>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{imageList.map((image) => (
						<div
							key={image.filename}
							style={{ margin: 8, cursor: 'pointer' }}
							onClick={() => handleImageSelect(image.filename)}
						>
							<Image
								width={80}
								src={`${serverURL}/uploads/${image.filename}`}
							/>
							<div>{image.filename}</div>
						</div>
					))}
				</div>
			</Modal>

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

					{/* Add other fields as needed for the category form */}

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
