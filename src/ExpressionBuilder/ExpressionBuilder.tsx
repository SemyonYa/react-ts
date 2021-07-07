import React from 'react';
import PropTypes from 'prop-types';
import './ExpressionBuilder.css';
import Part from './Part';

export class ExpressionPart {
    type: string;
    value: any;
    id: number;
    constructor(type: string, value: any, id: number) {
        this.type = type;
        this.value = value;
        this.id = id;
    }
}

export const types = {
    draggable: {
        operator: 'operator',
        brackets: 'brackets',
        num: 'num',
        model: 'model',
    },
    part: {
        operatorSelect: 'operatorSelect',
        bracketsLeft: 'bracketsLeft',
        bracketsRight: 'bracketsRight',
        numInput: 'numInput',
        modelSelect: 'modelSelect',
    },
};

export const operators = [
    '+',
    '-',
    '*',
    '/',
    '==',
    '!=',
    '&&',
    '||',
    '>',
    '>=',
    '<',
    '<=',
];

///
// Component
///

class ExpressionBuilder extends React.Component {
    viewModelProps: string[] = [];
    activeDraggable: string? = null;
    activeDroppableIndex: number? = null;
    parts: ExpressionPart[] = [];

    constructor(props: any) {
        super(props);
        for (let p in props.viewModel) {
            this.viewModelProps.push(p);
        }
    }

    get expression() {
        return this.props.expression;
    }

    parseExpresiion() {
        const stringParts = this.props.expression.split(' ');
        this.parts = stringParts.filter((p: any) => p).map((sp: string, index: number) => {
            if (sp === '(') {
                return new ExpressionPart(types.part.bracketsLeft, null, 10000 + index);
            } else if (sp === ')') {
                return new ExpressionPart(types.part.bracketsRight, null, 10000 + index);
            } else if (!isNaN(+sp)) {
                return new ExpressionPart(types.part.numInput, +sp, 10000 + index);
            } else if (operators.includes(sp)) {
                return new ExpressionPart(types.part.operatorSelect, sp, 10000 + index);
            } else if (this.viewModelProps.includes(sp)) {
                return new ExpressionPart(types.part.modelSelect, sp, 10000 + index);
            } else {
                throw new Error('Unexpected value');
            }
        });
        console.log(stringParts);
        console.log(this.parts);
    }

    onPartValueChanged(id: number, val: any) {
        let currentPart = this.parts.find(p => p.id === id);
        if (currentPart) currentPart.value = val;
        this.props.onExpressionChanged(this.printExpression());
    }

    printExpression() {
        let expression = '';
        this.parts.forEach(p => {
            if (p.type === types.part.bracketsLeft) {
                expression += '('
            } else if (p.type === types.part.bracketsRight) {
                expression += ')'
            } else {
                expression += p.value;
            }
            expression += ' '
        });
        return expression.trim();
    }

    addParts() {
        console.log('end');
        console.log(this.activeDraggable);
        console.log(this.activeDroppableIndex);
        if (this.activeDraggable && this.activeDroppableIndex) {
            if (this.activeDraggable === types.draggable.brackets) {
                this.parts = [
                    ...this.parts.slice(0, this.activeDroppableIndex),
                    new ExpressionPart(types.part.bracketsLeft, '(', 1001 + this.parts.length),
                    new ExpressionPart(types.part.bracketsRight, ')', 1001 + this.parts.length + 1),
                    ...this.parts.slice(this.activeDroppableIndex),
                ];
            } else {
                let waitingType: string? = null;
                let initialValue: number? = null;
                switch (this.activeDraggable) {
                    case types.draggable.operator:
                        waitingType = types.part.operatorSelect;
                        initialValue = +operators[0];
                        break;
                    case types.draggable.num:
                        waitingType = types.part.numInput;
                        initialValue = 0;
                        break;
                    case types.draggable.model:
                        waitingType = types.part.modelSelect;
                        initialValue = +this.viewModelProps[0]
                        break;
                    default:
                        break;
                }
                if (waitingType && initialValue) {
                    this.parts = [
                        ...this.parts.slice(0, this.activeDroppableIndex),
                        new ExpressionPart(waitingType, initialValue, 1001 + this.parts.length),
                        ...this.parts.slice(this.activeDroppableIndex),
                    ];
                }
            }

            this.props.onExpressionChanged(this.printExpression());
        }
        this.activeDraggable = null;
        this.activeDroppableIndex = null;
    }

    removePart(id: number) {
        this.parts = this.parts.filter(p => p.id !== id);
        this.props.onExpressionChanged(this.printExpression());
    }

    render() {
        const draggables = [];
        for (let d in types.draggable) {
            draggables.push(this.buildDraggable(types.draggable[d]));
        }
        this.parseExpresiion();
        return (
            <div className= 'wrap'>
            <div className='header'>
                <span className='header-caption' > Элементы конструктора выражения: </span>
                    <div className = 'parts' >
                        { draggables }
                        </div>
                        </div>
                        <div className = 'expression' >
                            { this.buildDroppable(0) }
        {
            this.parts.map((part, index) =>
                [
                    this.buildPart(part),
                    this.buildDroppable(index + 1),
                ]
            )
        }
        </div>
            </div>
        );
    }

    ///
    // Elements
    ///

    buildDraggable(draggableType: string) {
        return (
            <div
                style={this.draggableStyle }
                draggable = { true}
                onDragStart = {
                    () => { this.activeDraggable = draggableType; console.log('start'); }
                }
                onDragEnd = { this.addParts.bind(this) }
                key = { draggableType }
            >
                { draggableType }
            </div>
        );
}

buildDroppable(index: number) {
    return (
        <div
            style= { this.droppableStyle }
            draggable = { true}
            onDragOver = {(e) => {
                e.preventDefault();
                this.activeDroppableIndex = index
            }}
            onDragLeave = {() => {
                setTimeout(() => {
                    this.activeDroppableIndex = null;
                }, 10);
            }}
            key = { index }
                > </div>
                    );
                }

buildPart(part: ExpressionPart) {
    return (
        <Part value= { part.value }
            viewModelProps = { this.viewModelProps }
            type = { part.type }
            id = { part.id }
            key = { part.id }
            removePart = { this.removePart.bind(this) }
            onPartValueChanged = { this.onPartValueChanged.bind(this) }
        />
    );
}

///
//  Styles
///

draggableStyle = {
    height: '1.5rem',
    minWidth: '4rem',
    borderRadius: '4px',
    border: 'solid 1px #efefef',
    margin: '0 4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '.75rem',
    padding: '0 3px',
    lineHeight: 1,
}

droppableStyle = {
    height: '1.5rem',
    minWidth: '.4rem',
    borderRadius: '4px',
    border: 'solid 1px #efefef',
    margin: '0 4px',
}
}

// ExpressionBuilder.propTypes = {
//     expression: PropTypes.string.isRequired,
//     viewModel: PropTypes.object.isRequired,
// }

export default ExpressionBuilder