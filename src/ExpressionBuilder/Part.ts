import React from 'react';
import { operators, types } from './ExpressionBuilder';

interface IPartProps {
    value: any;
    viewModelProps: string[];
    type: string;
    id: number;
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

        this.initialValue = props.value;
        this.state = {
            value: props.value,
        };
    }

    changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: e.target.value
        });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
            this.props.onPartValueChanged(this.props.id, this.state.value);
        }, 500);
    }

    changeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onPartValueChanged(this.props.id, e.target.value);
    }

    render() {
        console.log(this.props.type);

        return (
            React.createElement('div', { style: this.wrapStyles },
                React.createElement('div', { style: this.itemStyles },
                    // FIELDS
                    (this.props.type === types.part.operatorSelect) ? React.createElement('select', { style: this.inputStyles, onChange: this.changeSelect.bind(this) },
                        ...operators.map(o => React.createElement('option', { value: o }, o))
                    ) : null,
                    (this.props.type === types.part.modelSelect) ? React.createElement('select', { style: this.inputStyles, onChange: this.changeSelect.bind(this) },
                        ...this.props.viewModelProps.map(p => React.createElement('option', { value: p }, p))
                    ) : null,
                    (this.props.type === types.part.numInput) ? React.createElement('input', {
                        style: this.inputStyles,
                        type: 'number',
                        value: this.state.value ?? this.initialValue,
                        onChange: this.changeInput.bind(this)
                    }) : null,
                    // BRACKETS
                    (this.props.type === types.part.bracketsLeft) ? '(' : null,
                    (this.props.type === types.part.bracketsRight) ? ')' : null,
                    // REMOVE
                    React.createElement('div', { style: this.removeStyle, onClick: () => this.props.removePart(this.props.id) }, 'x')
                ),
            )
        );
        //     <div style={this.wrapStyles}>
        //         {/* FIELDS */}
        //         {this.props.type === types.part.operatorSelect &&
        //             <div style={this.itemStyles}>
        //                 <select value={this.props.value} style={this.inputStyles} onChange={this.changeSelect.bind(this)}>
        //                     {operators.map(o =>
        //                         <option value={o} key={o}>{o}</option>
        //                     )}
        //                 </select>
        //             </div>
        //         }
        //         {this.props.type === types.part.modelSelect &&
        //             <div style={this.itemStyles}>
        //                 <select value={this.props.value} style={this.inputStyles} onChange={this.changeSelect.bind(this)}>
        //                     {this.props.viewModelProps.map(p =>
        //                         <option value={p} key={p}>{p}</option>
        //                     )}
        //                 </select>
        //             </div>
        //         }
        //         {this.props.type === types.part.numInput &&
        //             <div style={this.itemStyles}>
        //                 <input type='number' value={this.state.value ?? this.initialValue} style={this.inputStyles} onChange={this.changeInput.bind(this)} />
        //             </div>
        //         }
        //         {/* BRACKETS */}
        //         {this.props.type === types.part.bracketsLeft &&
        //             <div style={this.itemStyles}>(</div>
        //         }
        //         {this.props.type === types.part.bracketsRight &&
        //             <div style={this.itemStyles}>)</div>
        //         }
        //         {/* REMOVE */}
        //         <div style={this.removeStyle} onClick={() => this.props.removePart(this.props.id)}>&#10006;</div>
        //     </div>
        // );
    }

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