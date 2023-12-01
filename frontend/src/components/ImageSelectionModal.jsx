// ImageSelectionModal.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button, Image } from 'antd';
import PropTypes from 'prop-types';
import dictionaryStore from '../stores/dictionaryStore';

const ImageSelectionModal = ({ open, onClose, handleImageSelect }) => {
	const serverURL = import.meta.env.VITE_SERVER_URL;
	const [imageList, setImageList] = useState([]);

	useEffect(() => {
		fetchImageList();
	}, []);

	const fetchImageList = async () => {
		try {
			const response = await axios.get('/images');
			setImageList(response.data.data);
		} catch (error) {
			console.error('Error fetching image list:', error);
		}
	};

	return (
		<Modal
			title="Select Image"
			open={open}
			onCancel={onClose}
			footer={null}
		>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{imageList.length > 0 && imageList.map((image) => (
					<div
						key={image.filename}
						style={{ margin: 8, cursor: 'pointer' }}
					>
						<Image
							width={80}
							src={`${serverURL}/uploads/${image.path}`}
						/>
						<div onClick={() => handleImageSelect(image.path)}>
							<Button type="primary">{dictionaryStore.getString('select_image')}</Button>
						</div>
					</div>
				))}
			</div>
		</Modal>
	);
};

ImageSelectionModal.propTypes = {
	handleImageSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool,
};

export default ImageSelectionModal;
