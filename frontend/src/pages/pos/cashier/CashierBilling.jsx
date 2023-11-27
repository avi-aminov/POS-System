import { useState } from 'react';
import { observer } from 'mobx-react';
import cartStore from '../../../stores/cartStore';
import settingStore from '../../../stores/settingsStore';
import ordersStore from '../../../stores/ordersStore';
import dictionaryStore from '../../../stores/dictionaryStore';
import { Button, Row, Col } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { BillingWrap } from './CashierBilling.style';
import ModalForGetParameter from '../../../components/ModalForGetParameter';

const CashierBilling = observer(() => {
    const [modalVisible, setModalVisible] = useState(false);

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
        ordersStore.createOrder();
    };

    return (
        <BillingWrap>

            <ModalForGetParameter
                title="Add Discount"
                visible={modalVisible}
                onCancel={handleCloseModal}
                onOk={handleModalOk}
            />

            <Row>
                <Col span={12}>{dictionaryStore.getString('sub_total')}</Col>
                <Col span={12}>
                    {cartStore.getSubTotal()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>
            <Row>
                <Col span={12}>{dictionaryStore.getString('tax')} ({settingStore.settings.tax}%):</Col>
                <Col span={12}>
                    {cartStore.getTax()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>

            <Row>
                <Col span={12}>{dictionaryStore.getString('discount')}</Col>
                <Col span={12}>
                    -{cartStore.discount} {settingStore.settings.currencySymbol}
                    <PlusSquareOutlined onClick={handleOpenModal} />
                    <DeleteOutlined onClick={removeDiscount} />
                </Col>
            </Row>

            <Row>
                <Col span={12}>{dictionaryStore.getString('total')}</Col>
                <Col span={12}>
                    {cartStore.getTotalPrice()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            cartStore.clearCart();
                            cartStore.setDiscount(0.0);
                        }} type="primary" danger>
                        {dictionaryStore.getString('cancel_order')}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        type="primary"
                        onClick={placeOrder}>
                        {dictionaryStore.getString('place_order')}
                    </Button>
                </Col>
            </Row>
        </BillingWrap >
    );
});

export default CashierBilling;
