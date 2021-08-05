import * as React from 'react';
import { VIEW_MODEL_CONTEXT } from '../context/IViewModelContext';
import { IDynamicElementConfigurationComponentProps } from '../models/IDynamicElementConfigurationComponentProps';
import { IDynamicElementProps } from '../models/IDynamicElementProps';
import { SimpleDictionaryEditor } from './SimpleDictionaryEditor';


interface ITextBoxProps {
    defaultValue: string;
    labelText: string;
    onValueChange(newValue: string): void;
}

class TextBox extends React.PureComponent<ITextBoxProps>{
    private onChange = (e: Event) => { this.props.onValueChange((e.target as HTMLInputElement).value) };

    render() {
        console.log('textbox render with value' + this.props.defaultValue);

        return React.createElement('div', { style: { display: 'flex' } },
            React.createElement('label', { key: 'label' }, this.props.labelText),
            React.createElement('input', { key: 'text', type: 'text', onChange: this.onChange, value: this.props.defaultValue }));
    }
}

export const TextInput: React.FunctionComponent<IDynamicElementProps> = (props) => {
    let context = React.useContext(VIEW_MODEL_CONTEXT);
    let labelText = context.getExpression(props.settings['label']);

    return React.createElement(TextBox, { defaultValue: props.value, labelText: labelText, onValueChange: props.onValueChange });
}

export const TextInputSettingsEditor: React.FunctionComponent<IDynamicElementConfigurationComponentProps> = (props) => {
    return React.createElement(SimpleDictionaryEditor, { settingsLabels: { label: 'Prompt', title: 'Popup text' }, settings: props.settings, onSettingChanged: props.onSettingChanged });
}

export const TextInputDescription = { component: TextInput, configurationComponent: TextInputSettingsEditor, isContainer: false };