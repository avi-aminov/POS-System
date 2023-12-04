import { useEffect, useState } from 'react';
import { Select, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import settingsStore from '../../stores/settingsStore';
import dictionaryStore from '../../stores/dictionaryStore';

const { Option } = Select;

const SettingsPage = observer(() => {
    const [settingsData, setSettingsData] = useState(settingsStore.settings);

    useEffect(() => {
        settingsStore.fetchSettings();
        setSettingsData(settingsStore.settings);
    }, []);

    const handleInputChange = (fieldName, value) => {
        setSettingsData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const handleSaveClick = () => {
        settingsStore.saveMultipleKeys(settingsData);
    }

    return (
        <div style={{ margin: 16 }}>
            <h2>{dictionaryStore.getString('settings')}</h2>

            <div style={{ margin: '15px 0' }}>
                <span>{dictionaryStore.getString('select_currency_symbol')}</span>
                <Select
                    value={settingsData.currencySymbol}
                    style={{ width: 120 }}
                    onChange={(value) => handleInputChange('currencySymbol', value)}
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
                    value={settingsData.tax}
                    onChange={(e) => handleInputChange('tax', e.target.value)}
                />
            </div>

            <div style={{ margin: '15px 0' }}>
                <span>{dictionaryStore.getString('select_direction')} </span>
                <Select
                    value={settingsData.direction}
                    style={{ width: 180 }}
                    onChange={(value) => handleInputChange('direction', value)}
                >
                    <Option value="ltr">LTR</Option>
                    <Option value="rtl">RTL</Option>
                </Select>
            </div>

            <div style={{ margin: '15px 0' }}>
                <span>{dictionaryStore.getString('select_language')}</span>
                <Select
                    value={settingsData.lang}
                    style={{ width: 180 }}
                    onChange={(value) => handleInputChange('lang', value)}>
                    <Option value="eng">English</Option>
                    <Option value="heb">עברית</Option>
                </Select>
            </div>

            <div style={{ margin: '15px 0' }}>
                <Button type="primary" onClick={handleSaveClick}>
                    {dictionaryStore.getString('save')}
                </Button>
            </div>
        </div>
    );
});

export default SettingsPage;
