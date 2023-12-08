
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

const AddCategoryDrawer = observer(() => {

    const handleCategorySubmit = async (values) => {
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
    };

    return <Drawer
        title={dictionaryStore.getString('add_new_category')}
        open={categoriesStore.categoryPopupVisible}
        onClose={() => categoriesStore.setCategoryPopupVisible(false)}
        width={400}
        placement="right"
        footer={null}
    >
        <Form layout="vertical" onFinish={handleCategorySubmit}>
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
                console.log('setDrawerVisible');
            }}>
                {dictionaryStore.getString('select_image')}
            </Button>

            <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                    {dictionaryStore.getString('add_category')}
                </Button>
            </div>
        </Form>
    </Drawer>
});

export default AddCategoryDrawer;