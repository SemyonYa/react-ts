import React, { ReactNode } from "react";

export class ExpressionPart {
    type: string;
    value: any;
    constructor(type: string, value: any) {
        this.type = type;
        this.value = value;
    }
}

export const types: {draggable: any, part: any} = {
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
// EXPRESSION BUILDER
///
interface IExpressionBuilderProps {
    expression: string;
    viewModel: Object;
    onExpressionChanged(expression: string): void;
}

interface IExpressionBuilderState {
    parts: ExpressionPart[];
}

export class ExpressionBuilder extends React.PureComponent<IExpressionBuilderProps, IExpressionBuilderState> {
    parts: ExpressionPart[] = [];
    viewModelProps: string[] = [];
    activeDraggable?: string = undefined;
    activeDroppableIndex?: number = undefined;
    constructor(props: IExpressionBuilderProps) {
        super(props);
        for (let p in props.viewModel) {
            this.viewModelProps.push(p);
        }
        this.parseExpresiion();       
    }

    parseExpresiion(): void {
        const stringParts = this.props.expression.split(' ');
        this.parts = stringParts.filter((p: any) => p).map((sp: string, index: number) => {
            if (sp === '(') {
                return new ExpressionPart(types.part.bracketsLeft, '(');
            } else if (sp === ')') {
                return new ExpressionPart(types.part.bracketsRight, ')');
            } else if (!isNaN(+sp)) {
                return new ExpressionPart(types.part.numInput, +sp);
            } else if (operators.includes(sp)) {
                return new ExpressionPart(types.part.operatorSelect, sp);
            } else if (this.viewModelProps.includes(sp)) {
                return new ExpressionPart(types.part.modelSelect, sp);
            } else {
                throw new Error('Unexpected value');
            }
        });
    }

    addParts() {
        if (this.activeDraggable && this.activeDroppableIndex !== undefined) {
            if (this.activeDraggable === types.draggable.brackets) {
                this.parts = [
                    ...this.parts.slice(0, this.activeDroppableIndex),
                    new ExpressionPart(types.part.bracketsLeft, '('),
                    new ExpressionPart(types.part.bracketsRight, ')'),
                    ...this.parts.slice(this.activeDroppableIndex),
                ];
            } else {
                let waitingType: string | undefined = undefined;
                let initialValue: string | number | undefined = undefined;
                switch (this.activeDraggable) {
                    case types.draggable.operator:
                        waitingType = types.part.operatorSelect;
                        initialValue = operators[0];
                        break;
                    case types.draggable.num:
                        waitingType = types.part.numInput;
                        initialValue = 0;
                        break;
                    case types.draggable.model:
                        waitingType = types.part.modelSelect;
                        initialValue = this.viewModelProps[0]
                        break;
                    default:
                        waitingType = undefined;
                        initialValue = undefined;
                        break;
                }
                if (waitingType && initialValue !== undefined) {
                    this.parts = [
                        ...this.parts.slice(0, this.activeDroppableIndex),
                        new ExpressionPart(waitingType, initialValue),
                        ...this.parts.slice(this.activeDroppableIndex),
                    ];
                }
            }

            this.props.onExpressionChanged(
                this.partsToString()
            );
        }
        this.activeDraggable = undefined;
        this.activeDroppableIndex = undefined;
    }

    onPartValueChanged() {
        console.log(this.parts.map(p => p.value));
        this.props.onExpressionChanged(
            this.partsToString()
        );
    }

    removePart(part: ExpressionPart) {
        this.parts = this.parts.filter(p => p !== part);
        this.props.onExpressionChanged(
            this.partsToString()
        );

    }

    partsToString(): string {
        return this.parts.map(p => p.value).join(' ');
    }

    render() {
        const draggables: ReactNode[] = [];
        for (let d in types.draggable) {
            draggables.push(this.buildDraggable(types.draggable[d]));
        }
        return (
            React.createElement('div', { style: {display: 'flex', flexDirection: 'column'} },
                React.createElement('div', { style: {display: 'flex'} },
                    React.createElement('span', {}, 'Элементы конструктора выражения:'),
                    React.createElement('div', { style: {display: 'flex'} },
                       React.Children.toArray(draggables)
                    ),
                ),
                React.createElement('div', { style: {display: 'inline-flex'} },
                    this.buildDroppable(0),
                    ...React.Children.toArray(this.parts.map((part, index) =>
                        [
                            this.buildPart(part),
                            this.buildDroppable(index + 1),
                        ]
                    )),
                )
            )
        );
    }

    
    ///
    // Elements
    ///

    buildDraggable(draggableType: string): React.ReactNode {
        return React.createElement(
            'div',
            {
                style: {minWidth: '4rem', margin: '0 4px', display: 'flex'},
                draggable: true,
                onDragStart: () => { this.activeDraggable = draggableType },
                onDragEnd: this.addParts.bind(this),
            },
            draggableType,
        );
    }

    buildDroppable(index: number) {
        return React.createElement('div',
            {
                style: { width: '.5rem',borderRadius: '4px',border: 'solid 1px #efefef',margin: '0 4px' },
                draggable: true,
                onDragOver: (e) => {
                    e.preventDefault();
                    this.activeDroppableIndex = index
                },
                onDragLeave: () => {
                    setTimeout(() => {
                        this.activeDroppableIndex = undefined;
                    }, 10);
                },
            }
        );
    }

    buildPart(part: ExpressionPart) {
        return React.createElement(Part2, {
            partModel: part, 
            viewModelProps: this.viewModelProps, 
            onRemove: () => this.removePart.bind(this)(part),
            onPartValueChanged: this.onPartValueChanged.bind(this),
        });
    }
}

///
/// PART
///

interface IPartProps {
    viewModelProps: string[];
    partModel: ExpressionPart;
    onRemove(): void;
    onPartValueChanged(): void;
}

interface IPartState {
    value?: string | number
}

class Part2 extends React.PureComponent<IPartProps, IPartState> {
    currentTimeout: any;
    initialValue?: number;

    constructor(props: IPartProps) {
        super(props);

        this.initialValue = props.partModel.value;
        this.state = {
            value: undefined,
        };
    }

    changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue: number = +e.target.value;
        this.setState({
            value: currentValue
        });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
            this.props.partModel.value = currentValue;
            this.props.onPartValueChanged();
        }, 500);
    }
    
    changeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        this.props.partModel.value = e.target.value;
        this.props.onPartValueChanged();
    }

    render() {
        return (
            React.createElement('div', { style: {display: 'flex', width: '65px'} },
                React.createElement('div', { style: {display: 'flex'} },
                    // FIELDS
                    (this.props.partModel.type === types.part.operatorSelect) ? 
                        React.createElement('select', { defaultValue: this.props.partModel.value, style: {width: '100%'}, onChange: this.changeSelect.bind(this) },
                            ...operators.map(o => React.createElement('option', { value: o }, o)
                        )
                    ) : null,
                    (this.props.partModel.type === types.part.modelSelect) ? 
                        React.createElement('select', { defaultValue: this.props.partModel.value, style: {width: '100%'}, onChange: this.changeSelect.bind(this) },
                            ...this.props.viewModelProps.map(p => 
                                    React.createElement('option', { value: p }, p
                                )
                        )
                    ) : null,
                    (this.props.partModel.type === types.part.numInput) ? 
                        React.createElement('input', {style: {width: '100%'}, type: 'number', value: this.state.value ?? this.props.partModel.value, onChange: this.changeInput.bind(this)}) : null,
                    // BRACKETS
                    (this.props.partModel.type === types.part.bracketsLeft) ? '(' : null,
                    (this.props.partModel.type === types.part.bracketsRight) ? ')' : null,
                    // REMOVE
                    React.createElement('div', { onClick: () => this.props.onRemove() }, 'x')
                ),
            )
        );
    }
}