import { useEffect } from 'react';
//import axios from 'axios';
import { Space, Table } from 'antd';
const { Column } = Table;
import { observer } from 'mobx-react';
import customersStore from '../stores/customersStore';

const CutomerPage = observer(() => {
	useEffect(() => {
		customersStore.fetchCustomers();
	}, []);

	return (
		<>
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
							<a>Edit {/*record.id*/}</a>
						</Space>
					)}
				/>
			</Table>
		</>
	);
});

export default CutomerPage;
