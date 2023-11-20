import { observer } from 'mobx-react';
import customersStore from '../../stores/customersStore';
import { Select, } from 'antd';
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
            <div className="card-body pb-0">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="flex-grow-1">
                        <Select
                            style={{ width: '100%' }}
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
                </div>
                <div className="mb-3">
                    <label className="input-label text-capitalize">
                        Current customer :
                        <span
                            style={{ color: 'red', fontWeight: '700' }}
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
    );
});

export default SelectCustomer;