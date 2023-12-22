import { useState } from 'react';
import { observer } from 'mobx-react';
import cartStore from '../../../stores/cartStore';
import settingStore from '../../../stores/settingsStore';
import ordersStore from '../../../stores/ordersStore';
import dictionaryStore from '../../../stores/dictionaryStore';
import ModalForGetParameter from '../../../components/ModalForGetParameter';
import ToastService from '../../../components/Toast/ToastService';
import { MdAddBox } from "react-icons/md";
import { CgRemoveR } from "react-icons/cg";

const CashierBilling = observer(() => {
    const [modalVisible, setModalVisible] = useState(false);
    const Toast = ToastService();

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleModalOk = (inputValue) => {
        cartStore.setDiscount(inputValue);
        setModalVisible(false);
    };

    const removeDiscount = () => {
        cartStore.setDiscount(0.0);
    }

    const placeOrder = () => {
        ordersStore.createOrder(() => {
            Toast.success(dictionaryStore.getString('the_order_was_successfully_placed'));
        });
    };

    return (
        <div className="p-2 sm:p-4 h-96">
            <ModalForGetParameter
                title={dictionaryStore.getString('add_discount')}
                visible={modalVisible}
                onCancel={handleCloseModal}
                onOk={handleModalOk}
            />

            <div className="flex justify-between">
                <div className="col-span-6">{dictionaryStore.getString('sub_total')}</div>
                <div className="col-span-6">
                    {cartStore.getSubTotal()}
                    {settingStore.settings.currencySymbol}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="col-span-6">{dictionaryStore.getString('tax')} ({settingStore.settings.tax}%):</div>
                <div className="col-span-6">
                    {cartStore.getTax()}
                    {settingStore.settings.currencySymbol}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="col-span-6">{dictionaryStore.getString('discount')}</div>
                <div className="col-span-6 flex items-center">
                    -{cartStore.discount} {settingStore.settings.currencySymbol}
                    <MdAddBox size={22} onClick={handleOpenModal} className="ml-2 cursor-pointer" />
                    <CgRemoveR size={22} onClick={removeDiscount} className="ml-2 cursor-pointer" />
                </div>
            </div>
            <div className="flex justify-between">
                <div className="col-span-6">{dictionaryStore.getString('total')}</div>
                <div className="col-span-6">
                    {cartStore.getTotalPrice()}
                    {settingStore.settings.currencySymbol}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="col-span-6">
                    <button
                        onClick={() => {
                            cartStore.clearCart();
                            cartStore.setDiscount(0.0);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                    >
                        {dictionaryStore.getString('cancel_order')}
                    </button>
                </div>
                <div className="col-span-6">
                    <button
                        onClick={placeOrder}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                        {dictionaryStore.getString('place_order')}
                    </button>
                </div>
            </div>
            {Toast.ToastComponent}
        </div>
    );
});

export default CashierBilling;
