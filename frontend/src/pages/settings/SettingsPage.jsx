import { useEffect } from 'react';
import { Select, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';

const { Option } = Select;

const SettingsPage = observer(() => {
    useEffect(() => {
        settingsStore.fetchSettings();
    }, []);

    const handleCurrencySymbolChange = (value) => {
        settingsStore.updateValueByKey('currencySymbol', value);
    };

    const handleDirectionChange = (value) => {
        settingsStore.updateValueByKey('direction', value);
    };

    const handleTaxChange = (value) => {
        settingsStore.updateValueByKey('tax', value);
    };

    const handleLanguageChange = (value) => {
        settingsStore.updateValueByKey('lang', value);
    };

    return (
        <div style={{ margin: 16 }}>
            <h2>{dictionaryStore.getString('settings')}</h2>

            <div style={{ margin: '15px 0' }}>
                <span>{dictionaryStore.getString('select_currency_symbol')}</span>
                <Select
                    defaultValue={settingsStore.settings.currencySymbol}
                    style={{ width: 120 }}
                    onChange={handleCurrencySymbolChange}
                >
                    <Option value="$">USD ($)</Option>
                    <Option value="₪">ILS (₪)</Option>
                    <Option value="£">GBP (£)</Option>
                    <Option value="€">EUR (€)</Option>
                </Select>
            </div>

            <div style={{ margin: '15px 0', width: 180 }}>
                <span>{dictionaryStore.getString('enter_tax')}</span>
                <Input
                    type="number"
                    name="tax"
                    value={settingsStore.settings.tax}
                    onChange={(e) => handleTaxChange(e.target.value)}
                />
            </div>

            <div style={{ margin: '15px 0' }}>
                <span>{dictionaryStore.getString('select_direction')} </span>
                <Select
                    defaultValue={settingsStore.settings.direction}
                    style={{ width: 180 }}
                    onChange={handleDirectionChange}
                >
                    <Option value="ltr">LTR</Option>
                    <Option value="rtl">RTL</Option>
                </Select>
            </div>

            <div style={{ margin: '15px 0' }}>
                <span>{dictionaryStore.getString('select_language')}</span>
                <Select
                    defaultValue={settingsStore.settings.lang}
                    style={{ width: 180 }}
                    onChange={handleLanguageChange}>
                    <Option value="eng">English</Option>
                    <Option value="heb">עברית</Option>
                </Select>
            </div>
        </div>
    );
});

export default SettingsPage;
