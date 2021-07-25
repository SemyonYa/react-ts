import React, { BaseSyntheticEvent, ChangeEvent } from "react";
import { MenuItemDTO } from "../models/MenuItemDTO2";
import { Params } from "./Params";

interface ICreateFormProps {
    parentId?: string;
    hide(): void;
    onCreate(item: MenuItemDTO): void;
    showSelectParentModal(): void;
}

interface ICreateFormState {
    parentId: any;
    name: string;
    orderIndex: number;
    externalUrl: string;
    internalPageId: any;
    parametersObjectJson: string;
}

export class CreateForm extends React.PureComponent<ICreateFormProps, ICreateFormState> {

    constructor(props: ICreateFormProps) {
        super(props);
        this.state = {
            parentId: null,
            name: '',
            orderIndex: 0,
            externalUrl: '',
            internalPageId: '',
            parametersObjectJson: JSON.stringify([])
        };
    }

    private onSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        let item: MenuItemDTO = {
            parentId: this.state.parentId ?? this.props.parentId,
            name: this.state.name,
            orderIndex: this.state.orderIndex,
            externalUrl: this.state.externalUrl,
            internalPageId: this.state.internalPageId,
            parametersObjectJson: this.state.parametersObjectJson,
        } as MenuItemDTO;

        this.props.onCreate(item);
    }

    private onCancel = () => {
        this.props.hide();
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let key: string = e.target.name;
        switch (key) {
            case 'parentId':
                this.setState({ parentId: e.target.value })
                break;
            case 'name':
                this.setState({ name: e.target.value })
                break;
            case 'orderIndex':
                this.setState({ orderIndex: +e.target.value })
                break;
            case 'externalUrl':
                this.setState({ externalUrl: e.target.value })
                break;
            case 'internalPageId':
                this.setState({ internalPageId: e.target.value })
                break;
            default:
                break;
        }
    }

    private handleParamsChange = (paramsString: string) => {
        this.setState({ parametersObjectJson: paramsString });
    }

    render() {
        return (
            React.createElement('div', {},
                this.props.parentId ? `Create child for ${this.props.parentId}` : 'Create root item',
                React.createElement('form', { onSubmit: this.onSubmit, style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } },
                    this.buildFormItem(
                        'ID родителя',
                        React.createElement('input', { name: 'parentId', value: this.state.parentId ?? this.props.parentId ?? '', onClick: this.props.showSelectParentModal, /*onChange: this.handleChange, */type: 'text', readOnly: true })
                    ),
                    this.buildFormItem(
                        'Наименование',
                        React.createElement('input', { name: 'name', value: this.state.name ?? '', onChange: this.handleChange, type: 'text' })
                    ),
                    this.buildFormItem(
                        'Порядок',
                        React.createElement('input', { name: 'orderIndex', value: this.state.orderIndex, onChange: this.handleChange, type: 'number' })
                    ),
                    this.buildFormItem(
                        'Внешний URL',
                        React.createElement('input', { name: 'externalUrl', value: this.state.externalUrl, onChange: this.handleChange, type: 'text' })
                    ),
                    this.buildFormItem(
                        'ID страницы',
                        React.createElement('input', { name: 'internalPageId', value: this.state.internalPageId, onChange: this.handleChange, type: 'text' })
                    ),
                    this.buildFormItem(
                        'Параметры',
                        React.createElement(Params, { paramsString: this.state.parametersObjectJson, onChange: this.handleParamsChange })
                    ),
                    React.createElement('div', { style: { display: 'flex' } },
                        React.createElement('button', { type: 'submit' }, 'Сохранить'),
                        React.createElement('button', { type: 'button', onClick: this.onCancel }, 'Отмена')
                    )
                )
            )
        );
    }

    private buildFormItem = (label: string, elem: React.ReactNode) => {
        return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', margin: '.25rem 0' } },
            React.createElement('label', {}, label),
            elem
        );
    }
}