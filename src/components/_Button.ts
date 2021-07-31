import * as React from 'react';
export interface IButtonProps {
    onClick(): void
}

export class Button extends React.Component<IButtonProps> {
    render() {
        return (
            React.createElement('button', { onClick: this.props.onClick }, this.props.children)
        );
    }
}