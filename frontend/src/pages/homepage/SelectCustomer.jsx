import { observer } from 'mobx-react';
import customersStore from '../../stores/customersStore';
import { Select } from 'antd';

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
        <div>
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
    );
});

export default SelectCustomer;