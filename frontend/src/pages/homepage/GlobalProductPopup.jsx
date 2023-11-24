// GlobalProductPopup.jsx
import { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import cartStore from '../../stores/cartStore';

const GlobalProductPopup = ({ item, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleAddGlobalProduct = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            cartStore.addToCart({
                name: values.name,
                price: parseFloat(values.price),
                isGlobal: true,
            });
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible
            title="Add Global Product"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="add" type="primary" onClick={handleAddGlobalProduct} loading={loading}>
                    Add
                </Button>,
            ]}
        >
            <Form form={form}>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the product name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter the product price' }]}
                >
                    <Input type="number" min="0" step="0.01" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GlobalProductPopup;
