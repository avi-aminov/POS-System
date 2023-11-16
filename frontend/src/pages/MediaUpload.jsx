import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Button, message, List, Modal, Image } from 'antd';
import {
	UploadOutlined,
	DeleteOutlined,
	CopyOutlined,
} from '@ant-design/icons';

const MediaUpload = () => {
	const serverURL = 'http://localhost:3003';

	const [file, setFile] = useState(null);
	const [imageList, setImageList] = useState([]);
	const [previewImage, setPreviewImage] = useState(null);

	useEffect(() => {
		// Fetch the list of images when the component mounts
		fetchImageList();
	}, []);

	const fetchImageList = async () => {
		try {
			const response = await axios.get('/images');
			setImageList(response.data);
		} catch (error) {
			console.error('Error fetching image list:', error);
		}
	};

	const props = {
		beforeUpload: (file) => {
			setFile(file);
			return false;
		},
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			await axios.post('/upload', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			// Handle successful upload, e.g., show a success message or update media list.
			message.success('File uploaded successfully');
			// Refresh the image list after upload
			fetchImageList();
		} catch (error) {
			console.error('Error uploading file:', error);
			// Handle error, e.g., show an error message to the user.
			message.error('Failed to upload file');
		}
	};

	const handleCopyUrl = (url) => {
		// Implement the logic to copy the image URL to the clipboard
		// This example uses a simple prompt, you might want to use a library like clipboard.js
		prompt('Copy the image URL:', url);
	};

	const handleDelete = async (filename) => {
		try {
			await axios.delete(`/images/${filename}`);
			// Handle successful deletion, e.g., show a success message or update media list.
			message.success('File deleted successfully');
			// Refresh the image list after deletion
			fetchImageList();
		} catch (error) {
			console.error('Error deleting file:', error);
			// Handle error, e.g., show an error message to the user.
			message.error('Failed to delete file');
		}
	};

	const closeModal = () => {
		setPreviewImage(null);
	};

	return (
		<div>
			<Upload {...props}>
				<Button icon={<UploadOutlined />}>Select File</Button>
			</Upload>
			<Button
				type="primary"
				onClick={handleUpload}
				style={{ marginTop: 16 }}
			>
				Upload
			</Button>

			<List
				style={{ marginTop: 16 }}
				header={<div>Image</div>}
				bordered
				dataSource={imageList}
				renderItem={(item) => (
					<List.Item
						actions={[
							<>
								<Button
									type="link"
									icon={<CopyOutlined />}
									onClick={() =>
										handleCopyUrl(
											`${serverURL}/uploads/${item.filename}`,
										)
									}
								>
									Copy URL
								</Button>
								,
								<Button
									type="link"
									icon={<DeleteOutlined />}
									onClick={() => handleDelete(item.filename)}
								>
									Delete
								</Button>
							</>,
						]}
					>
						<Image
							width={100}
							src={`${serverURL}/uploads/${item.filename}`}
						/>
					</List.Item>
				)}
			/>

			{/* Image Preview Modal */}
			<Modal visible={!!previewImage} onCancel={closeModal} footer={null}>
				<img
					alt="Preview"
					style={{ width: '100%' }}
					src={previewImage}
				/>
			</Modal>
		</div>
	);
};

export default MediaUpload;
