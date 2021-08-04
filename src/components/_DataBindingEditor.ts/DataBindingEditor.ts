import * as React from 'react';
import { TemplateDTO } from '../../models/TemplateDTO';
import { TemplateStore } from '../../store/TemplateStore';

export interface IDataBindingEditorProps {
    template: TemplateDTO;
    store: TemplateStore;
}

export interface IDataBindingEditorState {

}

export class IDataBindingEditor extends React.Component<IDataBindingEditorProps, IDataBindingEditorState> {

    constructor(props: IDataBindingEditorProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            React.createElement('div', {},
                React.createElement('div', {}, 'asdasd')
            )
        );
    }
}
