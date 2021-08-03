import * as React from 'react';
import { IViewModelContext, VIEW_MODEL_CONTEXT } from '../context/IViewModelContext';

interface ISubmitButtonProps {
    text: string,
    method: string;
    initialValue?: boolean;
}
interface ISubmitButtonState {
    value: boolean;
}

export class SubmitButton extends React.Component<ISubmitButtonProps, ISubmitButtonState> {

    constructor(props: ISubmitButtonProps) {
        super(props);
        this.state = { value: null }
    }

    private click = () => {
        const context = this.context as IViewModelContext;
        this.setState({ value: !(this.state.value ?? this.props.initialValue ?? false) });
        context.contextController.executeMethod(this.props.method);
    }

    render() {
        return React.createElement('button', { onClick: this.click, type: 'button' }, this.props.text);
    }
}

SubmitButton.contextType = VIEW_MODEL_CONTEXT;