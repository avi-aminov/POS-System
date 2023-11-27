import { useEffect } from 'react';
//import axios from 'axios';
import { Space, Table, Button } from 'antd';
const { Column } = Table;
import { observer } from 'mobx-react';
import customersStore from '../../stores/customersStore';
import dictionaryStore from '../../stores/dictionaryStore';
import AddCustomerDrawer from './homepage/AddCustomerDrawer';

const CustomersPage = observer(() => {
	useEffect(() => {
		customersStore.fetchCustomers();
	}, []);

	const showDrawer = () => {
		customersStore.showAddCustomerDrawer = true;
	};

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				<Button type="primary" onClick={showDrawer}>
					{dictionaryStore.getString('add_new')}
				</Button>
			</div>


			<AddCustomerDrawer />

			<h1>Cutomer Page</h1>
			<Table dataSource={customersStore.customers}>
				<Column title="First Name" dataIndex="fName" key="firstName" />
				<Column title="Last Name" dataIndex="lName" key="lastName" />
				<Column title="Phone" dataIndex="phone" key="phone" />
				<Column title="email" dataIndex="email" key="email" />
				<Column title="Address" dataIndex="address" key="address" />
				<Column title="City" dataIndex="city" key="city" />
				<Column title="Zip" dataIndex="zip" key="zip" />

				<Column
					title="Action"
					key="action"
					render={(_, record) => (
						<Space size="middle">
							<a>Edit {record.id}</a>
						</Space>
					)}
				/>
			</Table>
		</>
	);
});

export default CustomersPage;
