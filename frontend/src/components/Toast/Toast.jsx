/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import classNames from 'classnames';

const Toast = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 3000); // Adjust the duration as needed

        return () => clearTimeout(timer);
    }, [onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case 'info':
                return 'bg-blue-500';
            case 'success':
                return 'bg-green-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className={classNames(
                'mb-1 p-4 text-white rounded-md shadow-md transition-opacity duration-300',
                getBackgroundColor(),
                { 'opacity-0': !visible, 'opacity-100': visible }
            )}
        >
            {message}
        </div>
    );
};

export default Toast;

/*
import ToastService from '../../components/Toast/ToastService';

const Toast = ToastService();

<button onClick={() => Toast.info('Info Message')}>Show Info Toast</button>
<button onClick={() => Toast.success('Success Message')}>Show Success Toast</button>
<button onClick={() => Toast.warning('Warning Message')}>Show Warning Toast</button>
<button onClick={() => Toast.error('Error Message')}>Show Error Toast</button>
{Toast.ToastComponent}
*/