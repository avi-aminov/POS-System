import { observer } from 'mobx-react';
import AddCustomerDrawer from '../AddCustomerDrawer';
import SelectCustomer from '../SelectCustomer';
import CashierProducts from './CashierProducts';
import CashierBilling from './CashierBilling';
import { Col } from 'antd';
import dictionaryStore from '../../../stores/dictionaryStore';
import {
	OrderPosWrap,
	RightSideWrap,
	RightSideHeader,
	CashierProductsWrap,
	TableHeaderRow
} from './Cashier.style';

const Cashier = observer(() => {

	return (
		<OrderPosWrap>
			<Col flex={2}>
				<AddCustomerDrawer />
				<div className="order--pos-right">
					<div className="card billing-section-wrap">

						<RightSideWrap>

							<RightSideHeader>
								<h5 className="p-3 m-0 bg-light">
									{dictionaryStore.getString('billing_section')}
								</h5>
								<SelectCustomer />
							</RightSideHeader>

							<TableHeaderRow gutter={16}>
								<Col span={8}>{dictionaryStore.getString('item')}</Col>
								<Col span={8}>{dictionaryStore.getString('qty')}</Col>
								<Col span={4}>{dictionaryStore.getString('price')}</Col>
								<Col span={4}>{dictionaryStore.getString('action')}</Col>
							</TableHeaderRow>

							<CashierProductsWrap>
								<CashierProducts />
							</CashierProductsWrap>

							<CashierBilling />
						</RightSideWrap>

					</div>
				</div>
			</Col>
		</OrderPosWrap>

	);
});

export default Cashier;
