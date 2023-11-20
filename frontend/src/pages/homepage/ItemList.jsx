import { Card } from 'antd';
import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';

const ItemList = observer(({ item }) => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const { Meta } = Card;

	const handleAddTOCart = () => {
		cartStore.addToCart(item);
	};

	return (
		<div>
			<Card
				onClick={() => handleAddTOCart()}
				style={{

					marginBottom: 20,
					cursor: 'pointer',
				}}
				cover={
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img
							alt={item.name}
							src={`${serverURL}/uploads/${item.image}`}
							style={{ height: 140, width: 'auto', padding: '5px' }}
						/>
					</div>
				}
			>
				<Meta title={item.name} />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{item.price}
					{settingStore.settings.currencySymbol}
				</div>
			</Card>
		</div>
	);
});

export default ItemList;