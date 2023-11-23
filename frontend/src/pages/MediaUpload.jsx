import { useState, useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import dictionaryStore from '../stores/dictionaryStore';
import {
	Upload,
	Button,
	Popconfirm,
	message,
	Modal,
	Image,
	Row,
	Col
} from 'antd';
import {
	UploadOutlined,
	DeleteOutlined,
	CopyOutlined,
} from '@ant-design/icons';
import { getBase64 } from '../utils/Utility';

const MediaUpload = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;
	const [fileList, setFileList] = useState([]);
	const [imageList, setImageList] = useState([]);
	const [previewImage, setPreviewImage] = useState(null);
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewOpen, setPreviewOpen] = useState(false);

	useEffect(() => {
		fetchImageList();
	}, []);

	const fetchImageList = async () => {
		try {
			const response = await axios.get('/images');
			setImageList(response.data);
		} catch (error) {
			message.success(dictionaryStore.getString('something_went_wrong'));
		}
	};

	const handleUpload = async () => {
		fetchImageList();
	};

	const handleCopyUrl = (url) => {
		prompt(dictionaryStore.getString('copy_the_image_url'), url);
	};

	const handleDelete = async (filename) => {
		try {
			await axios.delete(`/images/${filename}`);
			// Show a success message or update media list.
			message.success(dictionaryStore.getString('file_deleted_successfully'));
			// Refresh the image list after deletion
			fetchImageList();
		} catch (error) {
			message.error(dictionaryStore.getString('failed_to_delete_file'));
		}
	};

	const closeModal = () => {
		setPreviewOpen(false);
	};

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
		setPreviewOpen(true);
	};

	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

	const uploadButton = (
		<div>
			<UploadOutlined />
			<div style={{ marginTop: 8 }}>
				{dictionaryStore.getString('upload')}
			</div>
		</div>
	);

	return (
		<div>
			<Upload
				action={`${serverURL}/upload`}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				multiple={true}
				name="files"
				accept=".jpg, .jpeg, .png, .gif, .webp, .svg, .avif"
				beforeUpload={() => {
					console.log('beforeUpload');
				}}
			>
				{fileList.length >= 8 ? null : uploadButton}
			</Upload>

			<Button
				type="primary"
				onClick={handleUpload}
				style={{ marginTop: 16 }}
			>
				{dictionaryStore.getString('update_images_list')}
			</Button>

			<Row style={{ gap: '25px' }}>
				{imageList.map((item) => (
					<Col
						key={item.filename}
						className="gutter-row"
						span={3}
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							flex: '0 0 130px',
							maxWidth: '25%'
						}}
					>
						<div style={{ display: 'flex' }}>
							<Image height={140} src={`${serverURL}/uploads/${item.filename}`} />
							<div style={{
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
								width: '30px'
							}}>
								<CopyOutlined
									onClick={() =>
										handleCopyUrl(`${serverURL}/uploads/${item.filename}`)}
								/>

								<Popconfirm
									title={dictionaryStore.getString('are_you_sure_you_want_to_delete_this_image')}
									onConfirm={() => handleDelete(item.filename)}
									okText="Yes"
									cancelText="No"
								>
									<Button type="link" >
										<DeleteOutlined />
									</Button>
								</Popconfirm>
							</div>
						</div>

					</Col>
				))}
			</Row>

			{/* Image Preview Modal */}
			<Modal
				open={previewOpen}
				onCancel={closeModal}
				footer={null}
				title={previewTitle}
			>
				<img alt={dictionaryStore.getString('preview')} style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</div>
	);
});

export default MediaUpload;