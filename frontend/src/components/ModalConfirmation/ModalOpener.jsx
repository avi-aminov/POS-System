/* eslint-disable react/prop-types */
import { useState } from 'react';
import ModalConfirmation from './ModalConfirmation';

const ModalOpener = ({
    onConfirm,
    onClose,
    openerContent,
    title = 'Delete Item',
    content = 'Are you sure you want to delete This Item?',
    record,
}) => {
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const openModal = () => {
        setIsConfirmationModalOpen(true);
    };

    const handleConfirm = () => {
        onConfirm(record); // Pass the record to the onConfirm callback
        setIsConfirmationModalOpen(false); // Close the modal
    };

    const handleClose = () => {
        onClose(); // Call the provided onClose logic
        setIsConfirmationModalOpen(false); // Close the modal
    };

    return (
        <div>
            <div onClick={openModal} className="cursor-pointer">
                {openerContent}
            </div>

            {/* ModalConfirmation */}
            {isConfirmationModalOpen && (
                <ModalConfirmation onConfirm={handleConfirm} onClose={handleClose}>
                    {/* Additional content for the ModalConfirmation component */}
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{content}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleConfirm}
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleClose}
                            type="button"
                            className="bg-blue-500 text-white ml-2 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                            Cancel
                        </button>
                    </div>
                </ModalConfirmation>
            )}
        </div>
    );
};

export default ModalOpener;
