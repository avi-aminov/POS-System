import { observer } from 'mobx-react';
import cartStore from '../../../stores/cartStore';
import settingStore from '../../../stores/settingsStore';
import {
    DeleteOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined
} from '@ant-design/icons';
import {
    TableRow,
    ItemCol,
    Image, Title,
    QuantityCol,
    PriceCol,
    DeleteCol,
    PlusMinusWrap,
    StyledInput
} from './CashierProducts.style';

const CashierProducts = observer(() => {
    const serverURL = import.meta.env.VITE_SERVER_URL;

    const getTitle = (title) => {
        if (title.length > 15) {
            return title.slice(0, 12) + '...';
        } else {
            return title;
        }
    };

    return (
        <div>

            <div>
                {cartStore.cart &&
                    cartStore.cart.map((item) => (
                        <TableRow key={item.id} gutter={16}>
                            <ItemCol span={8}>
                                {
                                    item.id === 9999 ?
                                        <Image src={`${serverURL}/global/select-all.jpg`} alt="" /> :
                                        <Image
                                            src={`${serverURL}/uploads/${item.image}`}
                                            alt={item.name}
                                        />
                                }
                                <Title>{getTitle(item.name)}</Title>
                            </ItemCol>
                            <QuantityCol span={7}>
                                <StyledInput
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        cartStore.updateQuantity(item.id, e.target.value);
                                    }}
                                />
                                <PlusMinusWrap>
                                    <PlusSquareOutlined
                                        onClick={() => {
                                            cartStore.updateQuantityByDirection(item.id, 'plus');
                                        }}
                                    />
                                    <MinusSquareOutlined onClick={() => {
                                        cartStore.updateQuantityByDirection(item.id, 'minus');
                                    }}
                                    />
                                </PlusMinusWrap>
                            </QuantityCol>
                            <PriceCol span={4}>
                                {item.totalPrice && item.totalPrice}
                                {settingStore.settings.currencySymbol}
                            </PriceCol>
                            <DeleteCol span={4}>
                                <DeleteOutlined onClick={() => {
                                    cartStore.removeFromCart(item.id);
                                }} />
                            </DeleteCol>
                        </TableRow>
                    ))}
            </div>
        </div>
    );
});

export default CashierProducts;
