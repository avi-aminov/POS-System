import { useEffect, useState } from 'react';
import { Table, Button, Drawer, Form, Input, Popconfirm } from 'antd';
import { observer } from 'mobx-react-lite';
import customersStore from '../../stores/customersStore';
import dictionaryStore from '../../stores/dictionaryStore';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
        { title: dictionaryStore.getString('id'), dataIndex: 'id', key: 'id' },
        { title: dictionaryStore.getString('first_name'), dataIndex: 'fName', key: 'fName' },
        { title: dictionaryStore.getString('last_name'), dataIndex: 'lName', key: 'lName' },
        { title: dictionaryStore.getString('email'), dataIndex: 'email', key: 'email' },
        { title: dictionaryStore.getString('phone_number'), dataIndex: 'phone', key: 'phone' },
        { title: dictionaryStore.getString('address'), dataIndex: 'address', key: 'address' },
        { title: dictionaryStore.getString('city'), dataIndex: 'city', key: 'city' },
        { title: dictionaryStore.getString('zip'), dataIndex: 'zip', key: 'zip' },
        {
            title: dictionaryStore.getString('action'),
            key: 'action',
            render: (text, record) => (
                <span key={`action-${record.id}`}>
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title={dictionaryStore.getString('are_you_sure_you_want_to_delete_this_customer')}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined onClick={handleCancel} style={{ marginLeft: 8 }} />
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
                    {dictionaryStore.getString('add_new_customer')}
                </Button>
            </div>

            <Table dataSource={customersStore.customers} columns={columns} />

            <Drawer
                title={isEditing ? dictionaryStore.getString('edit_customer') : dictionaryStore.getString('add_new_customer')}
                placement="right"
                width={400}
                onClose={handleCancel}
                open={drawerVisible}
            >
                <Form form={form} layout="vertical" name="editCustomerForm">
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fName"
                        label={dictionaryStore.getString('first_name')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_first_name')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lName"
                        label={dictionaryStore.getString('last_name')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_last_name')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={dictionaryStore.getString('email')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_email')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={dictionaryStore.getString('phone_number')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_phone_number')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label={dictionaryStore.getString('address')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_address')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label={dictionaryStore.getString('city')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_city')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="zip"
                        label={dictionaryStore.getString('zip')}
                        rules={[{
                            required: true,
                            message: dictionaryStore.getString('please_enter_zip')
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSave}>
                            {dictionaryStore.getString('save')}
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                            {dictionaryStore.getString('cancel')}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
});

export default CustomersController;
