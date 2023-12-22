import { observer } from 'mobx-react';
import cartStore from '../../../stores/cartStore';
import settingStore from '../../../stores/settingsStore';
import ModalOpener from '../../../components/ModalConfirmation/ModalOpener';

import { RiDeleteBin2Line } from "react-icons/ri";
import { FiMinusSquare } from "react-icons/fi";
import { FaRegSquarePlus } from "react-icons/fa6";

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
            {cartStore.cart &&
                cartStore.cart.map((item) => (
                    <div key={item._id} className="border-b border-gray-200 p-2">
                        <div className="flex items-center">
                            <div className="w-2/4 flex items-center">
                                {item.id === 9999 ? (
                                    <img
                                        src={`${serverURL}/global/select-all.jpg`}
                                        alt=""
                                        className="w-10 h-10 rounded"
                                    />
                                ) : item.image ? (
                                    <img
                                        src={`${serverURL}/uploads/${item.image}`}
                                        alt={item.name}
                                        className="w-10 h-10 rounded"
                                    />
                                ) : null}
                                <h5 className="text-sm ml-2">{getTitle(item.name)}</h5>
                            </div>
                            <div className="w-1/4 flex items-center">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        cartStore.updateQuantity(item._id, e.target.value);
                                    }}
                                    className="w-12 border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                                <div className="flex flex-col ml-2">
                                    <FaRegSquarePlus
                                        onClick={() => {
                                            cartStore.updateQuantityByDirection(item._id, 'plus');
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <FiMinusSquare
                                        onClick={() => {
                                            cartStore.updateQuantityByDirection(item._id, 'minus');
                                        }}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="w-1/4">
                                {item.totalPrice && (
                                    <span className="text-sm">
                                        {item.totalPrice}
                                        {settingStore.settings.currencySymbol}
                                    </span>
                                )}
                            </div>
                            <div className="w-1/4">
                                <ModalOpener
                                    onConfirm={(item) => {
                                        cartStore.removeFromCart(item._id);
                                    }}
                                    onClose={() => {
                                        console.log('Cancel');
                                    }}
                                    openerContent={<RiDeleteBin2Line style={{ cursor: 'pointer' }} size={22} color='red' />}
                                    record={item} // Pass the record prop here
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
});

export default CashierProducts;
