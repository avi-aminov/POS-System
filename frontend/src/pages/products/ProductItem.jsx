import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';

const ItemList = observer(({ item }) => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const handleAddTOCart = () => {
		cartStore.addToCart(item);
	};

	return (
		<div className='text-center cursor-pointer' onClick={() => handleAddTOCart()}>
			{
				item.image
					?
					<img
						src={`${serverURL}/uploads/${item.image}`}
						alt={item.name}
						className="w-full object-cover h-full p-2"
					/>
					:
					item.name
			}
			<div className="px-1 py-4">
				<div className="font-bold text-xl mb-2">
					{item.price}
					{settingStore.settings.currencySymbol}
				</div>
				<p className="text-gray-700 text-base">
					{item.name}
				</p>
			</div>
		</div>
	);
});

export default ItemList;
