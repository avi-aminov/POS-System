import { useState, useEffect } from 'react';
import { Button, Drawer, Form, Row, Space, Col, Input, Select } from 'antd';

import {
	DeleteOutlined,
	PlusCircleOutlined,
	MinusCircleOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import settingStore from '../../stores/settingsStore';
import customersStore from '../../stores/customersStore';
import ordersStore from '../../stores/ordersStore';

const Cashier = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const [open, setOpen] = useState(false);

	useEffect(() => {
		customersStore.fetchCustomers();
	}, []);

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const createNoteFields = (event) => {
		const { name, value } = event.target;

		console.log('name', name);
		console.log('value', value);

		customersStore.setCreateForm({
			...customersStore.createForm,
			[name]: value,
		});
	};

	const createNote = async (event) => {
		event.preventDefault();
		customersStore.createNote();
		onClose();
	};

	const maxW3 = {
		maxWidth: '33%',
		marginLeft: '2%',
	};

	const flex = {
		display: 'flex',
	};

	const getTitle = (title) => {
		if (title.length > 15) {
			return title.slice(0, 12) + '...';
		} else {
			return title;
		}
	};

	const filterOption = (input, option) => {
		return (option?.label ?? '')
			.toLowerCase()
			.includes(input.toLowerCase());
	};

	const onChange = (value) => {
		customersStore.setSelectedCustomers(value);
	};

	const onSearch = (value) => {
		console.log('search:', value);
	};

	const placeOrder = () => {
		ordersStore.createOrder();
	};

	return (
		<Col style={maxW3} flex={2}>
			<Drawer
				title="Add New Customer"
				width={720}
				onClose={onClose}
				open={open}
				styles={{
					body: {
						paddingBottom: 80,
					},
				}}
				extra={
					<Space>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={createNote} type="primary">
							Add
						</Button>
					</Space>
				}
			>
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								name="fName"
								label="First Name"
								rules={[
									{
										required: true,
										message: 'Please enter first name',
									},
								]}
							>
								<Input
									name="fName"
									placeholder="Please enter first name"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								name="lName"
								label="Last Name"
								rules={[
									{
										required: false,
										message: 'Please enter last name',
									},
								]}
							>
								<Input
									name="lName"
									placeholder="Please enter last name"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								type="email"
								name="email"
								label="Email"
								rules={[
									{
										required: true,
										message: 'Please enter email',
									},
								]}
							>
								<Input
									name="email"
									placeholder="Please enter email"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								name="phone"
								label="Phone Number"
								rules={[
									{
										required: true,
										message: 'Please enter phone number',
									},
								]}
							>
								<Input
									name="phone"
									placeholder="Please enter phone number"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								name="address"
								label="Address"
								rules={[
									{
										required: false,
										message: 'Please enter address',
									},
								]}
							>
								<Input
									name="address"
									placeholder="Please enter address"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								name="city"
								label="City"
								rules={[
									{
										required: false,
										message: 'Please enter city',
									},
								]}
							>
								<Input
									name="city"
									placeholder="Please enter city"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								onChange={createNoteFields}
								name="zip"
								label="zip"
								rules={[
									{
										required: false,
										message: 'Please enter zip',
									},
								]}
							>
								<Input
									name="zip"
									placeholder="Please enter zip"
								/>
							</Form.Item>
						</Col>
						<Col span={12}></Col>
					</Row>
				</Form>
			</Drawer>

			<div className="order--pos-right" style={{}}>
				<div className="card billing-section-wrap">
					<h5 className="p-3 m-0 bg-light">Billing Section</h5>
					<div className="">
						<div className="card-body pb-0">
							<div className="d-flex align-items-center gap-2 mb-3">
								<div className="flex-grow-1">
									<Select
										showSearch
										placeholder="Select customer"
										optionFilterProp="children"
										onChange={onChange}
										onSearch={onSearch}
										filterOption={filterOption}
										options={
											customersStore.customerSelectData
										}
									/>
								</div>
								<div className="">
									<button
										className="w-i6 d-inline-block btn btn-success rounded text-nowrap"
										id="add_new_customer"
										type="button"
										data-toggle="modal"
										data-target="#add-customer"
										title="Add Customer"
										onClick={showDrawer}
									>
										Add Customer
									</button>
									<button
										className="w-i6 d-inline-block btn btn-danger rounded text-nowrap"
										id="remove_customer"
										type="button"
										data-toggle="modal"
										data-target="#add-customer"
										title="Add Customer"
										onClick={() => {
											customersStore.clearSelectedCustomers();
										}}
									>
										Remove Customer
									</button>
								</div>
							</div>
							<div className="mb-3">
								<label className="input-label text-capitalize">
									Current customer :
									<span
										className="style-i4"
										id="current_customer"
									>
										{customersStore.customerSelectData
											.length > 0 &&
											customersStore.customerSelectedData
												.fName}{' '}
										{customersStore.customerSelectData
											.length > 0 &&
											customersStore.customerSelectedData
												.lName}
									</span>
								</label>
							</div>
						</div>
					</div>

					<div id="cart">
						<div className="card-body pt-0">
							<div
								style={{ height: '350px' }}
								className="table-responsive pos-cart-table border"
							>
								<table className="table table-align-middle mb-0">
									<thead className="text-muted">
										<tr>
											<th>Item</th>
											<th>Qty</th>
											<th>Price</th>
											<th>Delete</th>
										</tr>
									</thead>
									<tbody>
										{cartStore.cart &&
											cartStore.cart.map((item) => {
												return (
													<tr key={item.id}>
														<td
															style={{
																display: 'flex',
															}}
														>
															<img
																className="avatar avatar-sm"
																src={`${serverURL}/uploads/${item.image}`}
																alt={item.name}
																style={{
																	position:
																		'relative',
																	display:
																		'inline-block',
																	width: '2.1875rem',
																	height: '2.1875rem',
																	borderRadius:
																		'0.3125rem',
																}}
															/>
															<div
																style={{
																	display:
																		'flex',
																	alignItems:
																		'center',
																}}
															>
																<h5
																	style={{
																		fontSize:
																			'14px',
																		paddingLeft:
																			'10px',
																	}}
																>
																	{getTitle(
																		item.name,
																	)}
																</h5>
															</div>
														</td>
														<td>
															<div style={flex}>
																<MinusCircleOutlined
																	onClick={() => {
																		cartStore.updateQuantityByDirection(
																			item.id,
																			'minus',
																		);
																	}}
																/>
																<Input
																	type="number"
																	value={
																		item.quantity
																	}
																	onChange={(
																		e,
																	) => {
																		console.log(
																			item.id,
																			e
																				.target
																				.value,
																		);
																		cartStore.updateQuantity(
																			item.id,
																			e
																				.target
																				.value,
																		);
																	}}
																/>
																<PlusCircleOutlined
																	onClick={() => {
																		cartStore.updateQuantityByDirection(
																			item.id,
																			'plus',
																		);
																	}}
																/>
															</div>
														</td>
														<td>
															<div>
																{item.totalPrice &&
																	item.totalPrice}
																{
																	settingStore
																		.settings
																		.currencySymbol
																}
															</div>
														</td>
														<td>
															<div
																onClick={() => {
																	cartStore.removeFromCart(
																		item.id,
																	);
																}}
																className="btn btn-sm btn-outline-danger square-btn"
															>
																<DeleteOutlined />
															</div>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="box p-3">
							<dl className="row">
								<dt className="col-6">Sub total :</dt>
								<dd className="col-6 text-right">
									{cartStore.getSubTotal()}
									{settingStore.settings.currencySymbol}
								</dd>

								<dt className="col-6">Discount :</dt>
								<dd className="col-6 text-right">
									<button
										id="extra_discount"
										className="btn btn-sm"
										type="button"
										data-toggle="modal"
										data-target="#add-discount"
									>
										<i className="tio-edit" />
									</button>
									0.00 $
								</dd>

								<dt className="col-6">
									Tax ({settingStore.settings.tax}%):
								</dt>
								<dd className="col-6 text-right">
									{cartStore.getTax()}
									{settingStore.settings.currencySymbol}
								</dd>
								<dt className="col-6">Total :</dt>
								<dd className="col-6 text-right h4 b">
									<span id="total_price">
										{cartStore.getTotalPrice()}
										{settingStore.settings.currencySymbol}
									</span>
								</dd>
							</dl>
							<div className="row g-2">
								<div className="col-6 mt-2">
									<a
										href="#"
										className="btn btn-danger btn-block"
										onClick={() => {
											cartStore.clearCart();
										}}
									>
										<i className="fa fa-times-circle " />
										Cancel Order
									</a>
								</div>
								<div className="col-6 mt-2">
									<button
										onClick={placeOrder}
										type="button"
										className="btn btn-success btn-block"
									>
										<i className="fa fa-shopping-bag" />
										Place Order
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Col>
	);
});

export default Cashier;
