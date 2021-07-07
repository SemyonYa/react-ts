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
            <div style={this.wrapStyles}>
                {/* FIELDS */}
                {this.props.type === types.part.operatorSelect &&
                    <div style={this.itemStyles}>
                        <select value={this.props.value} style={this.inputStyles} onChange={this.changeSelect.bind(this)}>
                            {operators.map(o =>
                                <option value={o} key={o}>{o}</option>
                            )}
                        </select>
                    </div>
                }
                {this.props.type === types.part.modelSelect &&
                    <div style={this.itemStyles}>
                        <select value={this.props.value} style={this.inputStyles} onChange={this.changeSelect.bind(this)}>
                            {this.props.viewModelProps.map(p =>
                                <option value={p} key={p}>{p}</option>
                            )}
                        </select>
                    </div>
                }
                {this.props.type === types.part.numInput &&
                    <div style={this.itemStyles}>
                        <input type='number' value={this.state.value ?? this.initialValue} style={this.inputStyles} onChange={this.changeInput.bind(this)} />
                    </div>
                }
                {/* BRACKETS */}
                {this.props.type === types.part.bracketsLeft &&
                    <div style={this.itemStyles}>(</div>
                }
                {this.props.type === types.part.bracketsRight &&
                    <div style={this.itemStyles}>)</div>
                }
                {/* REMOVE */}
                <div style={this.removeStyle} onClick={() => this.props.removePart(this.props.id)}>&#10006;</div>
            </div>
        );
    }

    wrapStyles: Object = {
        position: 'relative',
        // height: '1.5rem',
        width: '65px',
        borderRadius: '4px',
        border: 'solid 1px #efefef',
        display: 'flex',
    };

    itemStyles: Object = {
        display: 'flex',
        flex: '0 1 calc(100% - 10px)',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '11px',
        padding: '0 3px',
        lineHeight: '1',
    }

    inputStyles: Object = {
        width: '100%',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: 'solid 1px #cecece'
    }

    removeStyle: Object = {
        // position: 'absolute',
        top: '-.25rem',
        right: '0px',
        width: '.5rem',
        height: '.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        lineHeight: '1',
        borderRadius: '50%',
        fontSize: '.5rem',
        // color: 'darkred',
        cursor: 'pointer',
    }
}

// Part.propTypes = {

// }

export default Part