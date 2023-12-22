import { observer } from 'mobx-react';
import AddCustomerDrawer from './AddCustomerDrawer';
import SelectCustomer from './SelectCustomer';
import CashierProducts from './CashierProducts';
import CashierBilling from './CashierBilling';

import dictionaryStore from '../../../stores/dictionaryStore';
//import settingsStore from '../../../stores/settingsStore';

const Cashier = observer(() => {

	return (
		<div>
			<AddCustomerDrawer />
			<div className="order--pos-right">
				<div className="card billing-section-wrap">
					<div className="flex flex-col h-full">
						<div className="p-3 bg-light">
							<h5 className="m-0">
								{dictionaryStore.getString('billing_section')}
							</h5>
							<SelectCustomer />
						</div>

						<div className="bg-gray-200 p-3 font-bold">
							<div className="flex">
								<div className="w-2/4">{dictionaryStore.getString('item')}</div>
								<div className="w-1/4">{dictionaryStore.getString('qty')}</div>
								<div className="w-1/4">{dictionaryStore.getString('price')}</div>
								<div className="w-1/4">{dictionaryStore.getString('action')}</div>
							</div>
						</div>

						<div style={{ height: 'calc(100vh - 365px)' }} className="overflow-auto">
							<CashierProducts />
						</div>

						<CashierBilling />
					</div>
				</div>
			</div>
		</div>
	);
});

export default Cashier;
