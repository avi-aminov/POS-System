/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FaRegWindowClose } from "react-icons/fa";

const Drawer = ({ isOpen, onClose, children, zIndex, width, title }) => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const closeDrawer = () => {
        setOpen(false);
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 overflow-hidden transition-opacity ${open ? 'ease-out duration-300 opacity-100 pointer-events-auto' : 'ease-in duration-200 opacity-0 pointer-events-none'
                }`}
            style={{ zIndex }}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity" onClick={closeDrawer}></div>

                <section
                    className={`absolute inset-y-0 right-0 pl-10 max-w-full flex ${open ? `w-${width}` : 'w-0'}`}
                >
                    <div className="w-screen">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        {title}
                                    </h2>
                                    <FaRegWindowClose
                                        size={24}
                                        className="cursor-pointer z-1001 fixed top-4 right-14 flex justify-between p-0 m-0"
                                        onClick={closeDrawer}
                                    />
                                </div>
                            </div>
                            <div className="relative flex-1 p-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Drawer;
