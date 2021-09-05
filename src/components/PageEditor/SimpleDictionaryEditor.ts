import * as React from 'react';

export interface ISimpleDictionaryEditorProps {
    // TODO: 
    // settingsLabels: { [key: string]: {} };
    settingsLabels: { [key: string]: string };
    settings: { [key: string]: string };
    onSettingChanged(key: string, modelBasedExpression: string): void;
}

export class SimpleDictionaryEditor extends React.PureComponent<ISimpleDictionaryEditorProps>{
    private getOnSettingChangedListener(settingName: string) {
        return (e: Event) => {
            let newValue = (e.target as HTMLInputElement).value;

            this.props.onSettingChanged(settingName, newValue);
        }
    }

    render() {
        let settingsArray: string[] = [];

        for (let propertyName in this.props.settingsLabels) {
            settingsArray.push(propertyName);
        }

        return settingsArray.map((settingName) => {
            let value = this.props.settings[settingName];

            return React.createElement('div', { key: settingName, className: 'col-6' },
                React.createElement('div', { key: settingName, className: 'Form__item mb-2' },
                    React.createElement('label', {}, this.props.settingsLabels[settingName]),
                    React.createElement('input', { type: 'text', value: value ? value : '', onChange: this.getOnSettingChangedListener(settingName), className: 'k-textbox' }))
            )
        })
    }
}