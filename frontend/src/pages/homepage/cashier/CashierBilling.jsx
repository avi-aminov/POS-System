import { observer } from 'mobx-react';
import cartStore from '../../../stores/cartStore';
import settingStore from '../../../stores/settingsStore';
import ordersStore from '../../../stores/ordersStore';
import dictionaryStore from '../../../stores/dictionaryStore';
import { Button, Row, Col } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { BillingWrap } from './CashierBilling.style';

const CashierBilling = observer(() => {
    const placeOrder = () => {
        ordersStore.createOrder();
    };

    return (
        <BillingWrap>
            <Row>
                <Col span={12}>{dictionaryStore.getString('sub_total')}</Col>
                <Col span={12}>
                    {cartStore.getSubTotal()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>
            <Row>
                <Col span={12}>{dictionaryStore.getString('discount')}</Col>
                <Col span={12}>
                    0.00 {settingStore.settings.currencySymbol}
                    <PlusSquareOutlined
                        onClick={() => {
                            console.log('Add cupon')
                        }}
                    />
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
