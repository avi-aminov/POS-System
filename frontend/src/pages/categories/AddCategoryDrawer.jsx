
import { observer } from 'mobx-react';
import axios from 'axios';
import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';
import {
    Button,
    Drawer,
    Form,
    Input,
    message
} from 'antd';
import ImageUploader from '../media/ImageUploader';

const AddCategoryDrawer = observer(() => {

    const handleCategorySubmit = async (values) => {
        if (categoriesStore.editItem === null) {
            try {
                const data = { name: values.name, image: values.image };
                await axios.post('/add-category', data);
                message.success(dictionaryStore.getString('category_added_successfully'));
                categoriesStore.fetchCategories();
                categoriesStore.setCategoryPopupVisible(false);
            } catch (error) {
                console.error('Error adding category:', error);
                message.error(dictionaryStore.getString('error_adding_category'));
            }
        } else {
            const data = { ...values, _id: categoriesStore.editItem._id };

            try {
                await axios.post('/update-category', data);
                message.success(dictionaryStore.getString('product_updated_successfully'));

                // Update the MobX store's categories array
                const updatedCategories = categoriesStore.categories.map((category) =>
                    category._id === categoriesStore.editItem._id ? { ...category, ...data } : category
                );
                categoriesStore.categories = updatedCategories;
                categoriesStore.setCategoryPopupVisible(false);
            } catch (error) {
                message.error('Error updating category');
            }
        }
    };

    const closeDrawer = () => {
        categoriesStore.setDrawerVisible(false);
    };

    return <Drawer
        title={categoriesStore.editItem === null ? dictionaryStore.getString('add_new_category') : dictionaryStore.getString('edit_category')}
        open={categoriesStore.categoryPopupVisible}
        onClose={() => categoriesStore.setCategoryPopupVisible(false)}
        width={400}
        placement="right"
        footer={null}
    >
        <Form layout="vertical" initialValues={categoriesStore.editItem} onFinish={handleCategorySubmit}>
            <Form.Item
                name="name"
                label={dictionaryStore.getString('category_name')}
                rules={[
                    {
                        required: true,
                        message: dictionaryStore.getString('please_enter_the_category_name'),
                    },
                ]}
            >
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
            <Button type="primary" onClick={() => {
                categoriesStore.setDrawerVisible(true);
            }}>
                {dictionaryStore.getString('select_image')}
            </Button>

            <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                    {
                        categoriesStore.editItem === null
                            ? dictionaryStore.getString('add_category')
                            : dictionaryStore.getString('update_category')
                    }
                </Button>
            </div>
        </Form>

        <Drawer
            title="Image Uploader"
            width={'50%'}
            onClose={closeDrawer}
            open={categoriesStore.drawerVisible}
            style={{ zIndex: '9000' }}
        >
            <ImageUploader onClose={closeDrawer} />
        </Drawer>
    </Drawer>
});

export default AddCategoryDrawer;