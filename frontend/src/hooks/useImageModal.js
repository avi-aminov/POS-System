// useImageModal.js
import { useState } from 'react';

const useImageModal = () => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const [visible, setVisible] = useState(false);
	const [imageList, setImageList] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	const openImageModal = (images) => {
		setImageList(images);
		setVisible(true);
	};

	const closeImageModal = () => {
		setVisible(false);
	};

	const handleImageSelect = (image) => {
		const fullImageURL = `${serverURL}/uploads/${image}`;
		setSelectedImage(fullImageURL);
		// Close the modal
		closeImageModal();
	};

	return {
		visible,
		openImageModal,
		closeImageModal,
		imageList,
		selectedImage,
		handleImageSelect,
	};
};

export default useImageModal;
