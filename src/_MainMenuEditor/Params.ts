import React, { ChangeEvent } from "react";

class ParamModel {
    key: string = 'key';
    value: string = 'value';
}

interface IParamsProps {
    paramsString: string;
    onChange(paramsString: string): void;
}

interface IParamsState {
    items: ParamModel[];
}

export class Params extends React.Component<IParamsProps, IParamsState> {
    items: ParamModel[];

    constructor(props: IParamsProps) {
        super(props);
        this.items = JSON.parse(this.props.paramsString) as ParamModel[];
    }

    private onItemChanged = () => {
        this.change();
    }

    private addItem = () => {
        this.items.push(new ParamModel());
        this.change();
    }

    private removeItem = (model: ParamModel) => {
        this.items = this.items.filter(i => i !== model);
        this.change();
    }

    private change = () => {
        this.props.onChange(JSON.stringify(this.items));
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.Children.toArray(this.items.map(model =>
                    React.createElement(ParamsItem, { model, onChange: this.onItemChanged, onRemove: this.removeItem })
                )),
                React.createElement('div', { onClick: this.addItem }, '[+]')
            )
        );
    }
}


///
/// PARAMS ITEM
///

interface IParamsItemProps {
    model: ParamModel;
    onChange(): void;
    onRemove(model: ParamModel): void;
}

class ParamsItem extends React.Component<IParamsItemProps> {

    private onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.model.key = e.target.value;
        this.props.onChange();
    }

    private onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.model.value = e.target.value;
        this.props.onChange();
    }

    private remove = () => {
        this.props.onRemove(this.props.model);
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex' } },
                React.createElement('input', { value: this.props.model.key, onChange: this.onKeyChange, type: 'text' }),
                ' : ',
                React.createElement('input', { value: this.props.model.value, onChange: this.onValueChange, type: 'text' }),
                React.createElement('div', { onClick: this.remove }, '[x]')
            )
        );
    }
}