import * as React from 'react';

interface IButtonProps {
    text: string,
    methodName?: string;
    model?: any;
    onClick(): void,
}
interface IButtonState {
    value: boolean;
}

export class Button extends React.Component<IButtonProps> {

    constructor(props: IButtonProps) {
        super(props);
        this.state = { value: false }
    }

    private click = () => {
        this.props.onClick();
        (this.props.model[this.props.methodName] as Function).call(this.props.model);
    }

    render() {
        return (
            React.createElement('button', { onClick: this.props.onClick }, this.props.text)
        );
    }
}