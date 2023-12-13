import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';

const SettingsPage = observer(() => {
    const [settingsData, setSettingsData] = useState(settingsStore.settings);

    useEffect(() => {
        settingsStore.fetchSettings();
        setSettingsData(settingsStore.settings);
    }, []);

    const handleInputChange = (fieldName, value) => {
        setSettingsData((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const handleSaveClick = () => {
        settingsStore.saveMultipleKeys(settingsData);
    };

    return (
        <div className="m-4">
            <h1>{dictionaryStore.getString('settings')}</h1>

            <div className="my-4">
                <span>{dictionaryStore.getString('select_currency_symbol')}</span>
                <select
                    value={settingsData.currencySymbol}
                    className="w-32 border rounded-md p-2"
                    onChange={(e) => handleInputChange('currencySymbol', e.target.value)}
                >
                    <option value="$">USD ($)</option>
                    <option value="₪">ILS (₪)</option>
                    <option value="£">GBP (£)</option>
                    <option value="€">EUR (€)</option>
                </select>
            </div>

            <div className="my-4 w-48">
                <span>{dictionaryStore.getString('enter_tax')}</span>
                <input
                    type="number"
                    name="tax"
                    value={settingsData.tax}
                    className="border rounded-md p-2"
                    onChange={(e) => handleInputChange('tax', e.target.value)}
                />
            </div>

            <div className="my-4">
                <span>{dictionaryStore.getString('select_direction')} </span>
                <select
                    value={settingsData.direction}
                    className="w-48 border rounded-md p-2"
                    onChange={(e) => handleInputChange('direction', e.target.value)}
                >
                    <option value="ltr">LTR</option>
                    <option value="rtl">RTL</option>
                </select>
            </div>

            <div className="my-4">
                <span>{dictionaryStore.getString('select_language')}</span>
                <select
                    value={settingsData.lang}
                    className="w-48 border rounded-md p-2"
                    onChange={(e) => handleInputChange('lang', e.target.value)}
                >
                    <option value="eng">English</option>
                    <option value="heb">עברית</option>
                </select>
            </div>

            <div className="my-4">
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    onClick={handleSaveClick}
                >
                    {dictionaryStore.getString('save')}
                </button>
            </div>
        </div>
    );
});

export default SettingsPage;
