import { useEffect, useState } from 'react';
import { Table, Button, Drawer, Form, Input, Popconfirm } from 'antd';
import { observer } from 'mobx-react-lite';
import customersStore from '../stores/customersStore';

const CustomersController = observer(() => {
    const [form] = Form.useForm();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        customersStore.fetchCustomers();
    }, []);

    const showDrawer = () => {
        form.resetFields();
        setDrawerVisible(true);
        setIsEditing(false);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'First Name', dataIndex: 'fName', key: 'fName' },
        { title: 'Last Name', dataIndex: 'lName', key: 'lName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'City', dataIndex: 'city', key: 'city' },
        { title: 'ZIP', dataIndex: 'zip', key: 'zip' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span key={`action-${record.id}`}>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this customer?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const handleDelete = async (customerId) => {
        try {
            // Call your delete function from customersStore, passing the customerId
            await customersStore.deleteCustomer(customerId);
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleEdit = (customer) => {
        form.setFieldsValue(customer);
        setDrawerVisible(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            customersStore.setCreateForm(values);
            if (isEditing) {
                await customersStore.editCustomer(values);
            } else {
                await customersStore.createCustomer();
            }
            setDrawerVisible(false);
        } catch (error) {
            console.error('Error editing/adding customer:', error);
        }
    };

    const handleCancel = () => {
        setDrawerVisible(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 16 }}>
                <Button type="primary" onClick={showDrawer}>
                    Add New Customer
                </Button>
            </div>

            <Table dataSource={customersStore.customers} columns={columns} />

            <Drawer
                title={isEditing ? 'Edit Customer' : 'Add New Customer'}
                placement="right"
                width={400}
                onClose={handleCancel}
                visible={drawerVisible}
            >
                <Form form={form} layout="vertical" name="editCustomerForm">
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter phone' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: 'Please enter city' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="zip"
                        label="ZIP"
                        rules={[{ required: true, message: 'Please enter ZIP' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
});

export default CustomersController;
