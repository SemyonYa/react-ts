import React from 'react';
import { ExpressionPart, operators, types } from './ExpressionBuilder';

interface IPartProps {
    viewModelProps: string[];
    partModel: ExpressionPart;
    // id: number;
    // value: any;
    // type: string;
    removePart(id: number): void;
    onPartValueChanged(id: number, value: any): void;
}

interface IPartState {
    value: any
}

export class Part extends React.PureComponent<IPartProps, IPartState> {
    currentTimeout: any;
    initialValue: any;

    constructor(props: IPartProps) {
        super(props);
        console.log(props);

        this.initialValue = props.partModel.value;
        this.state = {
            value: props.partModel.value,
        };
    }

    changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: e.target.value
        });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
            this.props.onPartValueChanged(this.props.partModel.id, this.state.value);
        }, 500);
    }

    changeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onPartValueChanged(this.props.partModel.id, e.target.value);
    }

    render() {
        return (
            React.createElement('div', { style: this.wrapStyles },
                React.createElement('div', { style: this.itemStyles },
                    // FIELDS
                    (this.props.partModel.type === types.part.operatorSelect) ? React.createElement('select', { style: this.inputStyles, onChange: this.changeSelect.bind(this) },
                        ...operators.map(o => React.createElement('option', { value: o }, o))
                    ) : null,
                    (this.props.partModel.type === types.part.modelSelect) ? React.createElement('select', { style: this.inputStyles, onChange: this.changeSelect.bind(this) },
                        ...this.props.viewModelProps.map(p => React.createElement('option', { value: p }, p))
                    ) : null,
                    (this.props.partModel.type === types.part.numInput) ? React.createElement('input', {
                        style: this.inputStyles,
                        type: 'number',
                        value: this.state.value ?? this.initialValue,
                        onChange: this.changeInput.bind(this)
                    }) : null,
                    // BRACKETS
                    (this.props.partModel.type === types.part.bracketsLeft) ? '(' : null,
                    (this.props.partModel.type === types.part.bracketsRight) ? ')' : null,
                    // REMOVE
                    React.createElement('div', { style: this.removeStyle, onClick: () => this.props.removePart(this.props.partModel.id) }, 'x')
                ),
            )
        );
    }

    ///
    /// Styles
    ///

    wrapStyles: Object = {
        display: 'flex',
        width: '65px',
    };

    itemStyles: Object = {
        display: 'flex',
    }

    inputStyles: Object = {
        width: '100%',
    }

    removeStyle: Object = {
        cursor: 'pointer',
    }
}

export default Part