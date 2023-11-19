import { observer } from 'mobx-react';
import AddCustomerDrawer from './AddCustomerDrawer';
import SelectCustomer from './SelectCustomer';
import CashierProducts from './CashierProducts';
import CashierBilling from './CashierBilling';
import { Col } from 'antd';

const Cashier = observer(() => {
	const maxW3 = {
		maxWidth: '33%',
		marginLeft: '2%',
	};

	return (
		<Col style={maxW3} flex={2}>
			<AddCustomerDrawer />
			<div className="order--pos-right">
				<div className="card billing-section-wrap">
					<h5 className="p-3 m-0 bg-light">Billing Section</h5>
					<SelectCustomer />
					<div id="cart">
						<CashierProducts />
						<CashierBilling />
					</div>
				</div>
			</div>
		</Col>
	);
});

export default Cashier;
