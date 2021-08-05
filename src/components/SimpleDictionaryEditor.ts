import * as React from 'react';

export interface ISimpleDictionaryEditorProps {
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

        for (let propertyName in this.props.settings) {
            settingsArray.push(propertyName);
        }

        return React.createElement('table', { className: 'settingsEditorTable' },
            React.createElement('thead', {},
                React.createElement('tr', {},
                    React.createElement('th', {}, 'Setting'),
                    React.createElement('th', {}, 'Value')
                )
            ),
            React.createElement('tbody', {},
                settingsArray.map((settingName) => {
                    let value = this.props.settings[settingName];

                    return React.createElement('tr', { key: settingName },
                        React.createElement('td', {}, this.props.settingsLabels[settingName]),
                        React.createElement('td', {},
                            React.createElement('input', { type: 'text', value: value ? value : '', onChange: this.getOnSettingChangedListener(settingName) }))
                    )
                })
            )
        );
    }
}