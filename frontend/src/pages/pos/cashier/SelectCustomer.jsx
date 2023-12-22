import { observer } from 'mobx-react';
import customersStore from '../../../stores/customersStore';
import dictionaryStore from '../../../stores/dictionaryStore';

const SelectCustomer = observer(() => {
    const showDrawer = () => {
        customersStore.showAddCustomerDrawer = true;
    };

    const onChange = (value) => {
        customersStore.setSelectedCustomers(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    return (
        <div>
            <div className="flex">
                <div className="w-3/4">
                    <div className="p-2">
                        <select
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                            value={customersStore.selectedCustomers || ''}
                            onChange={(e) => onChange(e.target.value)}
                            onInput={(e) => onSearch(e.target.value)}
                        >
                            <option value="" disabled>
                                Select Customer
                            </option>
                            {customersStore.customerSelectData.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-1/4 flex items-center">
                    <button
                        className="cursor-pointer"
                        onClick={showDrawer}
                    >
                        Add User
                    </button>
                    <button
                        className="cursor-pointer ml-2"
                        onClick={() => {
                            customersStore.clearSelectedCustomers();
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="p-2">
                <label className="block">
                    {dictionaryStore.getString('current_customer')}
                    <span className="text-red-700 font-bold" id="current_customer">
                        {customersStore.customerSelectData.length > 0 &&
                            customersStore.customerSelectedData?.fName}{' '}
                        {customersStore.customerSelectData.length > 0 &&
                            customersStore.customerSelectedData?.lName}
                    </span>
                </label>
            </div>
        </div>
    );
});

export default SelectCustomer;
