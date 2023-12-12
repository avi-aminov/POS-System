import { useEffect, useState, useRef } from 'react';
import { EyeOutlined } from '@ant-design/icons';
//import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { Modal, Button, Table } from 'antd';
import { observer } from 'mobx-react';
import ordersStore from '../../stores/ordersStore';
import '../../styles/InvoiceStyles.css';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';

const OrdersPage = observer(() => {
	const componentRef = useRef();
	const [popupModal, setPopupModal] = useState(false);
	const [selectedBill, setSelectedBill] = useState(null);

	//useEffect
	useEffect(() => {
		ordersStore.fetchOrder();
	}, []);

	//print function
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	//able data
	const columns = [
		{ title: dictionaryStore.getString('order_number'), dataIndex: 'id', key: 'id' },
		{
			title: dictionaryStore.getString('customer_name'),
			dataIndex: 'fName',
			render: (text, record) => (
				<span>{`${record.fName} ${record.lName}`}</span>
			),
		},
		{
			title: dictionaryStore.getString('contact_no'),
			dataIndex: 'phone'
		},
		{
			title: dictionaryStore.getString('subtotal'),
			dataIndex: 'subTotal',
			render: (text, record) => (
				<span>{`${record.subTotal} ${settingsStore.settings.currencySymbol}`}</span>
			),
		},
		{
			title: dictionaryStore.getString('tax_2'),
			dataIndex: 'tax',
			render: (text, record) => (
				<span>{`${record.tax} ${settingsStore.settings.currencySymbol}`}</span>
			),
		},
		{
			title: dictionaryStore.getString('total_amount'),
			dataIndex: 'total',
			render: (text, record) => (
				<span>{`${record.total} ${settingsStore.settings.currencySymbol}`}</span>
			),
		},

		{
			title: dictionaryStore.getString('actions'),
			dataIndex: '_id',
			render: (_id, record) => (
				<div>
					<EyeOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => {
							setSelectedBill(record);
							setPopupModal(true);
						}}
					/>
				</div>
			),
		},
	];

	return (
		<div style={{ padding: '15px' }}>
			<div className="d-flex justify-content-between">
				<h1>{dictionaryStore.getString('invoice_list')}</h1>
			</div>

			<Table
				dataSource={ordersStore.orders.map(item => ({ ...item, key: item.id }))}
				columns={columns}
				bordered
			/>

			{popupModal && (
				<Modal
					width={600}
					pagination={false}
					title="Invoice Details"
					open={popupModal}
					onCancel={() => {
						setPopupModal(false);
					}}
					footer={false}
				>
					{/* ============ invoice modal start ==============  */}
					<div id="invoice-POS" ref={componentRef}>
						<center id="top">
							<div className="logo" />
							<div className="info">
								<h2>POS - System</h2>
								<p> Contact : 121212 | Tel Aviv</p>
							</div>
							{/*End Info*/}
						</center>
						{/*End InvoiceTop*/}
						<div id="mid">
							<div className="mt-2">
								<p>
									Customer Name :{' '}
									<b>
										{selectedBill.fName}{' '}
										{selectedBill.lName}
									</b>
									<br />
									Phone No : <b>{selectedBill.phone}</b>
									<br />
									Date :{' '}
									<b>
										{selectedBill.createdAt &&
											selectedBill.createdAt
												.toString()
												.substring(0, 10)}
									</b>
									<br />
								</p>
								<hr style={{ margin: '5px' }} />
							</div>
						</div>
						{/*End Invoice Mid*/}
						<div id="bot">
							<div id="table">
								<table>
									<tbody>
										<tr className="tabletitle">
											<td className="item">
												<h2>Item</h2>
											</td>
											<td className="Hours">
												<h2>Qty</h2>
											</td>
											<td className="Rate">
												<h2>Price</h2>
											</td>
											<td className="Rate">
												<h2>Total</h2>
											</td>
										</tr>
										{selectedBill.cartItems &&
											selectedBill.cartItems.map(
												(item) => (
													<>
														<tr className="service">
															<td className="tableitem">
																<p className="itemtext">
																	{item.name}
																</p>
															</td>
															<td className="tableitem">
																<p className="itemtext">
																	{
																		item.quantity
																	}
																</p>
															</td>
															<td className="tableitem">
																<p className="itemtext">
																	{item.price}
																</p>
															</td>
															<td className="tableitem">
																<p className="itemtext">
																	{item.quantity *
																		item.price}
																</p>
															</td>
														</tr>
													</>
												),
											)}

										<tr className="tabletitle">
											<td />
											<td />
											<td className="Rate">
												<h2>tax</h2>
											</td>
											<td className="payment">
												<h2>${selectedBill.tax}</h2>
											</td>
										</tr>
										<tr className="tabletitle">
											<td />
											<td />
											<td className="Rate">
												<h2>Grand Total</h2>
											</td>
											<td className="payment">
												<h2>
													<b>
														$
														{
															selectedBill.totalAmount
														}
													</b>
												</h2>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							{/*End Table*/}
							<div id="legalcopy">
								<p className="legal">
									<strong>Thank you for your order!</strong>{' '}
									10% GST application on total amount.Please
									note that this is non refundable amount for
									any assistance please write email
									<b> help@mydomain.com</b>
								</p>
							</div>
						</div>
						{/*End InvoiceBot*/}
					</div>
					{/*End Invoice*/}
					<div className="d-flex justify-content-end mt-3">
						<Button type="primary" onClick={handlePrint}>
							Print
						</Button>
					</div>
					{/* ============ invoice modal ends ==============  */}
				</Modal>
			)}
		</div>
	);
});

export default OrdersPage;
