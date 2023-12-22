import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Input } from "antd";
import dictionaryStore from '../stores/dictionaryStore';

const ModalForGetParameter = ({ visible, onCancel, onOk, title }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDialogOk = () => {
        onOk(inputValue);
        setInputValue(''); // Reset input value after clicking OK
    };

    return (
        <Dialog open={visible} handler={onCancel}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                <p>{dictionaryStore.getString('enter_a_parameter')}</p>
                <Input type="number" value={inputValue} onChange={handleInputChange} />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onCancel} className="mr-1">
                    <span>{dictionaryStore.getString('cancel')}</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleDialogOk}>
                    <span>{dictionaryStore.getString('ok')}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ModalForGetParameter;

