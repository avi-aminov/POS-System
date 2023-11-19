import { useEffect } from 'react';
import { Button, Drawer, Form, Row, Space, Col, Input } from 'antd';
import { observer } from 'mobx-react';
import customersStore from '../../stores/customersStore';

const AddCustomerDrawer = observer(() => {

    useEffect(() => {
        customersStore.fetchCustomers();
    }, []);

    const onClose = () => {
        customersStore.showAddCustomerDrawer = false;
    };

    const createCustomerFields = (event) => {
        const { name, value } = event.target;

        customersStore.setCreateForm({
            ...customersStore.createForm,
            [name]: value,
        });
    };

    const createCutsomer = async (event) => {
        event.preventDefault();
        customersStore.createCutsomer();
        onClose();
    };

    return (
        <Drawer
            title="Add New Customer"
            width={720}
            onClose={onClose}
            open={customersStore.showAddCustomerDrawer}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={createCutsomer} type="primary">
                        Add
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="fName"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter first name',
                                },
                            ]}
                        >
                            <Input
                                name="fName"
                                placeholder="Please enter first name"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="lName"
                            label="Last Name"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please enter last name',
                                },
                            ]}
                        >
                            <Input
                                name="lName"
                                placeholder="Please enter last name"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            type="email"
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter email',
                                },
                            ]}
                        >
                            <Input
                                name="email"
                                placeholder="Please enter email"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter phone number',
                                },
                            ]}
                        >
                            <Input
                                name="phone"
                                placeholder="Please enter phone number"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please enter address',
                                },
                            ]}
                        >
                            <Input
                                name="address"
                                placeholder="Please enter address"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="city"
                            label="City"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please enter city',
                                },
                            ]}
                        >
                            <Input
                                name="city"
                                placeholder="Please enter city"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="zip"
                            label="zip"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please enter zip',
                                },
                            ]}
                        >
                            <Input
                                name="zip"
                                placeholder="Please enter zip"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}></Col>
                </Row>
            </Form>
        </Drawer>
    );
});

export default AddCustomerDrawer;
