import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import dictionaryStore from '../stores/dictionaryStore';

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
            okText={dictionaryStore.getString('ok')}
            cancelText={dictionaryStore.getString('cancel')}
        >
            <p>{dictionaryStore.getString('enter_a_parameter')}</p>
            <Input type='number' value={inputValue} onChange={handleInputChange} />
        </Modal>
    );
};

export default ModalForGetParameter;
