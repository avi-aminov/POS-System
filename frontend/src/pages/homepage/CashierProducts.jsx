import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';
import { Input } from 'antd';
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';


const CashierProducts = observer(() => {
    const serverURL = import.meta.env.VITE_SERVER_URL;

    const flex = {
        display: 'flex',
    };

    const getTitle = (title) => {
        if (title.length > 15) {
            return title.slice(0, 12) + '...';
        } else {
            return title;
        }
    };

    return (
        <div className="card-body pt-0">
            <div
                style={{ height: '350px' }}
                className="table-responsive pos-cart-table border"
            >
                <table className="table table-align-middle mb-0">
                    <thead className="text-muted">
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartStore.cart &&
                            cartStore.cart.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <img
                                                className="avatar avatar-sm"
                                                src={`${serverURL}/uploads/${item.image}`}
                                                alt={item.name}
                                                style={{
                                                    position:
                                                        'relative',
                                                    display:
                                                        'inline-block',
                                                    width: '2.1875rem',
                                                    height: '2.1875rem',
                                                    borderRadius:
                                                        '0.3125rem',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    display:
                                                        'flex',
                                                    alignItems:
                                                        'center',
                                                }}
                                            >
                                                <h5
                                                    style={{
                                                        fontSize:
                                                            '14px',
                                                        paddingLeft:
                                                            '10px',
                                                    }}
                                                >
                                                    {getTitle(
                                                        item.name,
                                                    )}
                                                </h5>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={flex}>
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        cartStore.updateQuantityByDirection(
                                                            item.id,
                                                            'minus',
                                                        );
                                                    }}
                                                />
                                                <Input
                                                    type="number"
                                                    value={
                                                        item.quantity
                                                    }
                                                    onChange={(
                                                        e,
                                                    ) => {
                                                        console.log(
                                                            item.id,
                                                            e
                                                                .target
                                                                .value,
                                                        );
                                                        cartStore.updateQuantity(
                                                            item.id,
                                                            e
                                                                .target
                                                                .value,
                                                        );
                                                    }}
                                                />
                                                <PlusCircleOutlined
                                                    onClick={() => {
                                                        cartStore.updateQuantityByDirection(
                                                            item.id,
                                                            'plus',
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {item.totalPrice &&
                                                    item.totalPrice}
                                                {
                                                    settingStore
                                                        .settings
                                                        .currencySymbol
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                onClick={() => {
                                                    cartStore.removeFromCart(
                                                        item.id,
                                                    );
                                                }}
                                                className="btn btn-sm btn-outline-danger square-btn"
                                            >
                                                <DeleteOutlined />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default CashierProducts;
