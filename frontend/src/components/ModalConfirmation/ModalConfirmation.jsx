/* eslint-disable react/prop-types */
const ModalConfirmation = ({ onClose, children }) => {
    return (
        <div>
            {/* Background overlay */}
            <div
                onClick={() => {
                    onClose();
                }}
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal */}
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Modal panel */}
                    <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            {/* Modal content */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmation;
