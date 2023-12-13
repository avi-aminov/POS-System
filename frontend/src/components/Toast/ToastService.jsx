// ToastService.jsx
import { useState } from 'react';
import Toast from './Toast';

const ToastService = () => {
    const [toasts, setToasts] = useState([]);

    const info = (message) => {
        const newToast = {
            id: Date.now(),
            message,
            type: 'info',
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const success = (message) => {
        const newToast = {
            id: Date.now(),
            message,
            type: 'success',
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const warning = (message) => {
        const newToast = {
            id: Date.now(),
            message,
            type: 'warning',
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const error = (message) => {
        const newToast = {
            id: Date.now(),
            message,
            type: 'error',
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return {
        info,
        success,
        warning,
        error,
        removeToast,
        ToastComponent: (
            //     position: fixed; display: flex; flex-flow: column; gap: 6px;
            <div className="fixed flex-row gap-2 z-1001 top-0 right-0 p-4">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                        style={{ marginTop: '1rem' }}
                    />
                ))}
            </div>
        ),
    };
};

export default ToastService;
