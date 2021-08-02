import * as React from 'react';

interface IToggleButtonProps {
    text: string,
    initialValue?: boolean;
    method: string;
    model: any;
}
interface IToggleButtonState {
    value: boolean;
}

export class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {

    constructor(props: IToggleButtonProps) {
        super(props);
        this.state = { value: null }
    }

    private click = () => {
        const newValue: boolean = !(this.state.value ?? this.props.initialValue ?? false);
        if (typeof this.props.model[this.props.method] === 'function') {
            this.setState({ value: newValue });
            (this.props.model[this.props.method] as Function).call(this.props.model, newValue);
        } else {
            console.error(`${this.props.method} is not a Function`);
        }
    }

    render() {
        return (
            React.createElement('button', { onClick: this.click, type: 'button' },
                this.props.text,
                (this.state.value ?? this.props.initialValue ?? false)
                    ? '+'
                    : '-'
            )
        );
    }
}