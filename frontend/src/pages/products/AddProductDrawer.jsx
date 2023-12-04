import axios from 'axios';
import { observer } from 'mobx-react';
import {
    Drawer,
    Button,
    Form,
    Input,
    Select,
    InputNumber,
    message,
} from 'antd';

import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';
import productsStore from '../../stores/productsStore';

const AddProductDrawer = observer(() => {
    const showDrawer = () => {
        productsStore.setDrawerVisible(true);
    };

    // handle form  submit
    const handleSubmit = async (value) => {
        if (productsStore.editItem === null) {
            const data = { ...value };
            try {
                await axios.post('/add-product', data);
                message.success(dictionaryStore.getString('product_added_successfully'));
                productsStore.addProduct(data);
                productsStore.setPopupModal(false);
            } catch (error) {
                console.error('Error adding category:', error);
                message.error(dictionaryStore.getString('error_adding_category'));
            }
        } else {
            const data = { ...value, _id: productsStore.editItem._id };

            try {
                await axios.post('/update-product', data);
                message.success(dictionaryStore.getString('product_updated_successfully'));

                // Update the MobX store's products array
                const updatedProducts = productsStore.products.map((product) =>
                    product._id === productsStore.editItem._id ? { ...product, ...data } : product
                );
                productsStore.products = updatedProducts;
                productsStore.setPopupModal(false);
            } catch (error) {
                message.error('Error updating product');
            }
        }
    };


    return <>
        {productsStore.productPopupModal && (
            <Drawer
                title={`${productsStore.editItem !== null ?
                    dictionaryStore.getString('edit_product') :
                    dictionaryStore.getString('add_new_product')
                    }`}
                open={productsStore.productPopupModal}
                onClose={() => {
                    productsStore.setEditItem(null);
                    productsStore.setPopupModal(false);
                }}
                width={400} // Set the width according to your design
                placement="right" // Adjust placement as needed
                footer={null} // Remove footer if not needed
            >
                <Form
                    layout="vertical"
                    initialValues={productsStore.editItem}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label={dictionaryStore.getString('name')}
                        rules={[
                            {
                                required: true,
                                message: dictionaryStore.getString('please_enter_the_name'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label={dictionaryStore.getString('description')}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label={dictionaryStore.getString('price')}
                        rules={[
                            {
                                required: true,
                                message: dictionaryStore.getString('please_enter_the_price'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="newPrice" label={dictionaryStore.getString('new_price')}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label={dictionaryStore.getString('stock')}
                        rules={[
                            {
                                required: true,
                                message: dictionaryStore.getString('please_enter_the_stock'),
                            },
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="barcode" label={dictionaryStore.getString('barcode')}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label={dictionaryStore.getString('select_image')}
                        rules={[
                            {
                                message: dictionaryStore.getString('please_enter_the_name'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" onClick={showDrawer}>
                        {dictionaryStore.getString('select_image')}
                    </Button>

                    <Form.Item
                        name="categoryID"
                        label={dictionaryStore.getString('category')}
                        rules={[
                            {
                                required: true,
                                message: dictionaryStore.getString('please_select_the_category'),
                            },
                        ]}
                    >
                        <Select>
                            {categoriesStore.categories &&
                                categoriesStore.categories.map((item) => (
                                    <Select.Option
                                        value={item._id}
                                        key={item._id}
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <div className="d-flex justify-content-end">
                        <Button type="primary" htmlType="submit">
                            {productsStore.editItem !== null ?
                                dictionaryStore.getString('save') :
                                dictionaryStore.getString('add')
                            }
                        </Button>
                    </div>
                </Form>
            </Drawer>
        )}
    </>;
});

export default AddProductDrawer;