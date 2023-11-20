import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';
import ordersStore from '../../stores/ordersStore';
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
                <Col span={12}>Sub total :</Col>
                <Col span={12}>
                    {cartStore.getSubTotal()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>

            <Row>
                <Col span={12}>Discount :</Col>
                <Col span={12}>
                    0.00 $
                    <PlusSquareOutlined
                        onClick={() => {
                            console.log('Add cupon')
                        }}
                    />

                </Col>
            </Row>

            <Row>
                <Col span={12}>Tax ({settingStore.settings.tax}%):</Col>
                <Col span={12}>
                    {cartStore.getTax()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>

            <Row>
                <Col span={12}>Sub total :</Col>
                <Col span={12}>
                    {cartStore.getSubTotal()}
                    {settingStore.settings.currencySymbol}
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            cartStore.clearCart();
                        }} type="primary" danger>
                        Cancel Order
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        type="primary"
                        onClick={placeOrder}>
                        Place Order
                    </Button>
                </Col>
            </Row>

        </BillingWrap >
    );
});

export default CashierBilling;
