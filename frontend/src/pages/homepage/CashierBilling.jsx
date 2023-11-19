import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';
import ordersStore from '../../stores/ordersStore';

const CashierBilling = observer(() => {
    const placeOrder = () => {
        ordersStore.createOrder();
    };

    return (
        <div className="box p-3">
            <dl className="row">
                <dt className="col-6">Sub total :</dt>
                <dd className="col-6 text-right">
                    {cartStore.getSubTotal()}
                    {settingStore.settings.currencySymbol}
                </dd>

                <dt className="col-6">Discount :</dt>
                <dd className="col-6 text-right">
                    <button
                        id="extra_discount"
                        className="btn btn-sm"
                        type="button"
                        data-toggle="modal"
                        data-target="#add-discount"
                    >
                        <i className="tio-edit" />
                    </button>
                    0.00 $
                </dd>

                <dt className="col-6">
                    Tax ({settingStore.settings.tax}%):
                </dt>
                <dd className="col-6 text-right">
                    {cartStore.getTax()}
                    {settingStore.settings.currencySymbol}
                </dd>
                <dt className="col-6">Total :</dt>
                <dd className="col-6 text-right h4 b">
                    <span id="total_price">
                        {cartStore.getTotalPrice()}
                        {settingStore.settings.currencySymbol}
                    </span>
                </dd>
            </dl>
            <div className="row g-2">
                <div className="col-6 mt-2">
                    <a
                        href="#"
                        className="btn btn-danger btn-block"
                        onClick={() => {
                            cartStore.clearCart();
                        }}
                    >
                        <i className="fa fa-times-circle " />
                        Cancel Order
                    </a>
                </div>
                <div className="col-6 mt-2">
                    <button
                        onClick={placeOrder}
                        type="button"
                        className="btn btn-success btn-block"
                    >
                        <i className="fa fa-shopping-bag" />
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CashierBilling;
