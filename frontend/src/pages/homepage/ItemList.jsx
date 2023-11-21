import { Card } from 'antd';
import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';
import { ImageWrap, Img, Price } from './ItemList.style';

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
					<ImageWrap>
						<Img alt={item.name} src={`${serverURL}/uploads/${item.image}`} />
					</ImageWrap>
				}
			>
				<Meta title={item.name} />
				<Price>
					{item.price}
					{settingStore.settings.currencySymbol}
				</Price>
			</Card>
		</div>
	);
});

export default ItemList;
