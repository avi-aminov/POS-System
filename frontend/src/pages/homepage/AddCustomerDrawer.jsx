import { useEffect } from 'react';
import { Button, Drawer, Form, Row, Space, Col, Input } from 'antd';
import { observer } from 'mobx-react';
import customersStore from '../../stores/customersStore';
import dictionaryStore from '../../stores/dictionaryStore';

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
            title={dictionaryStore.getString('add_new_customer')}
            width={720}
            onClose={onClose}
            open={customersStore.showAddCustomerDrawer}
            extra={
                <Space>
                    <Button type="primary" onClick={onClose} danger>
                        {dictionaryStore.getString('cancel')}
                    </Button>

                    <Button type="primary" onClick={createCutsomer}>
                        {dictionaryStore.getString('add')}
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="fName"
                            label={dictionaryStore.getString('first_name')}
                            rules={[
                                {
                                    required: true,
                                    message: dictionaryStore.getString('please_enter_first_name'),
                                },
                            ]}
                        >
                            <Input
                                name="fName"
                                placeholder={dictionaryStore.getString('please_enter_first_name')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="lName"
                            label={dictionaryStore.getString('last_name')}
                            rules={[
                                {
                                    required: false,
                                    message: dictionaryStore.getString('please_enter_last_name'),
                                },
                            ]}
                        >
                            <Input
                                name="lName"
                                placeholder={dictionaryStore.getString('please_enter_last_name')}
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
                            label={dictionaryStore.getString('email')}
                            rules={[
                                {
                                    required: true,
                                    message: dictionaryStore.getString('please_enter_email'),
                                },
                            ]}
                        >
                            <Input
                                name="email"
                                placeholder={dictionaryStore.getString('please_enter_email')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="phone"
                            label={dictionaryStore.getString('phone_number')}
                            rules={[
                                {
                                    required: true,
                                    message: dictionaryStore.getString('please_enter_phone_number'),
                                },
                            ]}
                        >
                            <Input
                                name="phone"
                                placeholder={dictionaryStore.getString('please_enter_phone_number')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="address"
                            label={dictionaryStore.getString('address')}
                            rules={[
                                {
                                    required: false,
                                    message: dictionaryStore.getString('please_enter_address'),
                                },
                            ]}
                        >
                            <Input
                                name="address"
                                placeholder={dictionaryStore.getString('please_enter_address')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="city"
                            label={dictionaryStore.getString('city')}
                            rules={[
                                {
                                    required: false,
                                    message: dictionaryStore.getString('please_enter_city'),
                                },
                            ]}
                        >
                            <Input
                                name="city"
                                placeholder={dictionaryStore.getString('please_enter_city')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            onChange={createCustomerFields}
                            name="zip"
                            label={dictionaryStore.getString('zip')}
                            rules={[
                                {
                                    required: false,
                                    message: dictionaryStore.getString('please_enter_zip'),
                                },
                            ]}
                        >
                            <Input
                                name="zip"
                                placeholder={dictionaryStore.getString('please_enter_zip')}
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
