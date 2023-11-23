import { observer } from 'mobx-react';
import customersStore from '../../stores/customersStore';
import dictionaryStore from '../../stores/dictionaryStore';
import { Select, Row, Col } from 'antd';
import { UserAddOutlined, MinusCircleOutlined } from '@ant-design/icons';

const SelectCustomer = observer(() => {

    const showDrawer = () => {
        customersStore.showAddCustomerDrawer = true;
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

    return (
        <div >
            <div>
                <Row>
                    <Col span={18}>
                        <div style={{ padding: '0px 0px 5px 15px' }}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder={dictionaryStore.getString('select_customer')}
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={
                                    customersStore.customerSelectData
                                }
                            />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div>
                            <UserAddOutlined
                                style={{ cursor: 'pointer' }}
                                onClick={showDrawer}
                            />
                            <MinusCircleOutlined
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    customersStore.clearSelectedCustomers();
                                }}
                            />
                        </div>
                    </Col>
                </Row>

                <div style={{ padding: '0px 0px 5px 15px' }}>
                    <label>
                        {dictionaryStore.getString('current_customer')}
                        <span
                            style={{ color: 'red', fontWeight: '700' }}
                            className="style-i4"
                            id="current_customer"
                        >
                            {customersStore.customerSelectData.length > 0 &&
                                customersStore.customerSelectedData?.fName}{' '}
                            {customersStore.customerSelectData.length > 0 &&
                                customersStore.customerSelectedData?.lName}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
});

export default SelectCustomer;