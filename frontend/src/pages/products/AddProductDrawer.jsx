/* eslint-disable react/prop-types */
import { useState } from 'react';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';
import productsStore from '../../stores/productsStore';
import ImageUploader from '../media/ImageUploader';
import ToastService from '../../components/Toast/ToastService';
import Drawer from '../../components/Drawer';

const AddProductDrawer = observer(() => {
    const Toast = ToastService();

    const [formFields] = useState([
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'new_price', label: 'New Price', type: 'number' },
        { name: 'stock', label: 'Stock', type: 'number' },
        { name: 'barcode', label: 'Barcode', type: 'text' },
        { name: 'image', label: 'Image', type: 'text' },
    ]);

    const showDrawer = (e) => {
        e.preventDefault();
        productsStore.setDrawerVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const onSaveSuccess = () => {
            Toast.success(dictionaryStore.getString('product_added_successfully'));
            productsStore.fetchProducts();
            productsStore.setPopupModal(false);
        };

        const onUpdateSuccess = () => {
            Toast.success(dictionaryStore.getString('product_updated_successfully'));
        };

        if (!productsStore.isEditItem) {
            productsStore.saveProduct(onSaveSuccess, (error) => {
                console.error('Error adding category:', error);
                Toast.error(dictionaryStore.getString('error_adding_category'));
            });
        } else {
            productsStore.editProduct(onUpdateSuccess, (error) => {
                console.error('Error', error);
                Toast.error('Error updating product');
            });
        }
    };

    const fieldsHandler = (fieldName, value) => {
        if (value !== undefined) {
            productsStore.setEditItem(fieldName, value);
        }
    };

    const closeDrawer = () => {
        productsStore.setDrawerVisible(false);
    };

    return (
        <>
            {productsStore.productPopupModal && (
                <>
                    <Drawer
                        title={`${productsStore.isEditItem ?
                            dictionaryStore.getString('edit_product') :
                            dictionaryStore.getString('add_new_product')
                            }`}
                        isOpen={productsStore.productPopupModal}
                        onClose={() => {
                            productsStore.setEditItem(null);
                            productsStore.setPopupModal(false);
                            productsStore.isEditItem = false;
                        }}
                        zIndex={1002}
                        width="1/3"
                    >
                        <form className="max-w-md mx-auto">
                            <div className="flex w-72 flex-col gap-6">
                                {formFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        onChange={(e) => fieldsHandler(field.name, e.target.value)}
                                        value={productsStore.editItem[field.name] || ''}
                                    />
                                ))}

                                <button
                                    type="primary"
                                    onClick={showDrawer}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                >
                                    {dictionaryStore.getString('select_image')}
                                </button>

                                <select
                                    label={dictionaryStore.getString('category')}
                                    name="categoryID"
                                    onChange={(e) => fieldsHandler('categoryID', e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md"
                                >
                                    {categoriesStore.categories &&
                                        categoriesStore.categories.map((item) => (
                                            <option value={item._id} key={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>

                                <button
                                    type="primary"
                                    onClick={handleSubmit}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                                    {productsStore.isEditItem ?
                                        dictionaryStore.getString('save') :
                                        dictionaryStore.getString('add')
                                    }
                                </button>
                            </div>
                        </form>
                        {Toast.ToastComponent}
                    </Drawer>

                    <Drawer
                        title="Image Uploader"
                        onClose={closeDrawer}
                        isOpen={productsStore.drawerVisible}
                        zIndex={1003}
                        width="2/3"
                    >
                        <ImageUploader onClose={closeDrawer} />
                    </Drawer>
                </>
            )}
        </>
    );
});

const FormInput = ({ label, name, type, onChange, value }) => {
    const inputProps = {
        name,
        onChange,
        value,
        className: "mt-1 p-2 w-full border rounded-md",
    };

    return (
        <>
            {type === 'textarea' ? (
                <textarea
                    {...inputProps}
                    placeholder={`Enter ${label}`}
                />
            ) : (
                <input
                    type={type}
                    {...inputProps}
                    placeholder={`Enter ${label}`}
                />
            )}
        </>
    );
};

export default AddProductDrawer;
