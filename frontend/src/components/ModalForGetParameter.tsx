import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const ModalForGetParameter = ({ visible, onCancel, onOk, title }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onCancel}
            onOk={() => onOk(inputValue)}
        >
            <p>Enter a parameter:</p>
            <Input type='number' value={inputValue} onChange={handleInputChange} />
        </Modal>
    );
};

export default ModalForGetParameter;
