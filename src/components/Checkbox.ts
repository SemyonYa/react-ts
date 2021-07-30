import React from 'react';

interface ICheckboxProps {
    initialValue?: boolean;
    onChange(value: boolean): void;
}

interface ICheckboxState {
    checked: boolean;
}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {

    constructor(props: ICheckboxProps) {
        super(props);
        this.state = { checked: false };
    }

    toggle = () => {
        const newValue: boolean = !this.state.checked;
        this.setState({ checked: newValue });
        this.props.onChange(newValue);
    }

    render() {
        return (
            React.createElement('div', {
                onClick: this.toggle,
                style: {
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    border: 'solid 1px #ccc',
                    boxShadow: 'inset 0 0 2px 0 rgba(0,0,0,24)',
                    cursor: 'pointer'
                }
            },
                this.state.checked
                    ? React.createElement('span', { style: { fontSize: '14px' } }, '\u2714')
                    : null
            )
        );
    }
}