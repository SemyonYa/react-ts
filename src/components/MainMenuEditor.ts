import React, { BaseSyntheticEvent, ChangeEvent } from 'react';
import { APPLICATION_CONTEXT, IApplicationContext } from '../context/IApplicationContext';
import { MenuItemDTO } from '../models/MenuItemDTO2';
import { MainMenuStore } from '../store/MainMenuStore';

const store = new MainMenuStore();

enum FormType {
    create,
    edit
}

interface IMainMenuEditorProps {
}

interface IMainMenuEditorState {
    roots: MenuItemDTO[];
    editableItem: MenuItemDTO;
    formType: FormType;
    parentId: string;
    selectParentModalShown: boolean;
}

export class MainMenuEditor extends React.PureComponent<IMainMenuEditorProps, IMainMenuEditorState> {
    constructor(props: IMainMenuEditorProps) {
        super(props);
        this.state = {
            roots: [],
            editableItem: null,
            formType: null,
            parentId: null,
            selectParentModalShown: false
        };
    }

    componentDidMount() {
        this.fetch();
    }

    private fetch = () => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        store.getRoots()
            .then(
                roots => {
                    this.setState({ roots: roots.sort((r1, r2) => r1.orderIndex - r2.orderIndex) });
                    context.hideLoadingScreen();
                },
            )
            .catch(context.contextController.setError);
    }

    private toggleForm = (formType: FormType, editableItem: MenuItemDTO = null, parentId = null) => {
        this.setState({ editableItem, formType, parentId });
    }

    private showForm = () => {
        this.toggleForm(FormType.create);
    }

    private hideForm = () => {
        this.toggleForm(null);
    }

    private showSelectParentModal = () => {
        this.setState({ selectParentModalShown: true })
    }

    private hideSelectParentModal = () => {
        this.setState({ selectParentModalShown: false })
    }

    private selectParent = (parentId: string) => {
        this.setState({ selectParentModalShown: false, parentId })
    }

    private onFormSubmit = (item: MenuItemDTO, isEdit: boolean) => {
        if (isEdit) {
            this.updateItem(item);
        } else {
            this.createItem(item);
        }
    }

    private createItem = (item: MenuItemDTO) => {
        let context = this.context as IApplicationContext;
        store.create(item)
            .then(
                res => {
                    this.fetch();
                },
            )
            .catch(context.contextController.setError);
    }

    private updateItem = (item: MenuItemDTO) => {
        let context = this.context as IApplicationContext;
        store.update(item)
            .then(
                res => {
                    this.fetch();
                }
            )
            .catch(context.contextController.setError);
    }

    private deleteItem = (id: string) => {
        let context = this.context as IApplicationContext;
        store.delete(id)
            .then(
                res => {
                    this.fetch();
                },
            )
            .catch(context.contextController.setError);
    }

    render() {
        let formComponent: React.ReactNode;
        switch (this.state.formType) {
            case FormType.create:
                formComponent = React.createElement(Form, {
                    parentId: this.state.parentId,
                    hide: this.hideForm,
                    onSubmit: this.onFormSubmit,
                    showSelectParentModal: this.showSelectParentModal,
                    isEditForm: false
                })
                break;
            case FormType.edit:
                formComponent = React.createElement(Form, {
                    editableModel: this.state.editableItem,
                    parentId: this.state.parentId,
                    hide: this.hideForm,
                    onSubmit: this.onFormSubmit,
                    showSelectParentModal: this.showSelectParentModal,
                    isEditForm: true,
                    onDelete: this.deleteItem
                })
                break;
            default:
                formComponent = null;
                break;
        }

        return (
            React.createElement('div', {},
                React.createElement('div', { style: { display: 'flex' } },
                    React.createElement('div', { style: { flex: '0 1 50%' } },
                        this.state.roots ?
                            this.state.roots.length > 0
                                ? React.Children.toArray(
                                    [
                                        ...this.state.roots.map(model =>
                                            React.createElement(MainMenuEditorItem, { model, toggleForm: this.toggleForm }),
                                        ),
                                        React.createElement('div', { onClick: this.showForm }, '[+]')
                                    ]
                                )
                                : 'empty list'
                            : null
                    ),
                    React.createElement('div', { style: { flex: '0 1 50%' } },
                        formComponent
                    ),
                ),
                this.state.selectParentModalShown
                    ? React.createElement(SelectParentModal, { onSelect: this.selectParent, hide: this.hideSelectParentModal })
                    : null
            )
        );
    }
}

MainMenuEditor.contextType = APPLICATION_CONTEXT;


/// 
///  MAIN MENU ITEM
/// 

interface IMainMenuEditorItemProps {
    model: MenuItemDTO;
    toggleForm(editorType: FormType, editableItem?: MenuItemDTO, parentId?: string): void;
}

interface IMainMenuEditorItemState {
    children: MenuItemDTO[];
}

class MainMenuEditorItem extends React.PureComponent<IMainMenuEditorItemProps, IMainMenuEditorItemState> {

    constructor(props: IMainMenuEditorItemProps) {
        super(props);
        this.state = {
            children: null,
        };

    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', { style: { display: 'flex' } },
                    React.createElement('div', { onClick: this.fetchChildren }, this.props.model.name),
                    React.createElement('div', { onClick: this.edit }, '[edit]'),
                ),
                React.createElement('div', { style: { paddingLeft: '2rem' } },
                    this.state.children ?
                        this.state.children.length > 0
                            ? React.Children.toArray(
                                [
                                    ...this.state.children.map(model =>
                                        React.createElement(MainMenuEditorItem, { model, toggleForm: this.props.toggleForm }),
                                    ),
                                    React.createElement('div', { onClick: this.create }, '[+]')
                                ]
                            )
                            : 'empty list'
                        : null
                ),
            )
        );
    }

    private fetchChildren = () => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        store.getChildren(this.props.model.id)
            .then(
                children => {
                    this.setState({ children: children.sort((ch1, ch2) => ch1.orderIndex - ch2.orderIndex) });
                    context.hideLoadingScreen();
                }
            )
            .catch(context.contextController.setError);
    }

    private edit = () => {
        this.props.toggleForm(FormType.edit, this.props.model, this.props.model.parentId);
    }

    private create = () => {
        this.props.toggleForm(FormType.create, null, this.props.model.id);
    }
}

MainMenuEditorItem.contextType = APPLICATION_CONTEXT;


///
/// FORM
///

interface IFormProps {
    parentId?: string;
    hide(): void;
    onSubmit(item: MenuItemDTO, isEdit: boolean): void;
    showSelectParentModal(): void;
    isEditForm: boolean;
    editableModel?: MenuItemDTO;
    onDelete?(id: string): void;
}

interface IFormState {
    id: string;
    parentId: any;
    name: string;
    orderIndex: number;
    externalUrl: string;
    internalPageId: any;
    parametersObjectJson: string;
}

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            id: null,
            parentId: null,
            name: null,
            orderIndex: null,
            externalUrl: null,
            internalPageId: null,
            parametersObjectJson: null
        };
    }

    shouldComponentUpdate(nextProps: IFormProps, _: IFormState, __: any) {
        if (nextProps.editableModel?.id !== this.props.editableModel?.id) {
            this.setState({
                id: null,
                parentId: null,
                name: null,
                orderIndex: null,
                externalUrl: null,
                internalPageId: null,
                parametersObjectJson: null
            });
        }

        return true;
    }

    private onSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        let item: MenuItemDTO = {
            id: this.state.id ?? this.props.editableModel?.id,
            parentId: this.state.parentId ?? this.props.parentId,
            name: this.state.name ?? this.props.editableModel?.name,
            orderIndex: this.state.orderIndex ?? this.props.editableModel?.orderIndex,
            externalUrl: this.state.externalUrl ?? this.props.editableModel?.externalUrl,
            internalPageId: this.state.internalPageId ?? this.props.editableModel?.internalPageId,
            parametersObjectJson: this.state.parametersObjectJson ?? this.props.editableModel?.parametersObjectJson,
        } as MenuItemDTO;

        this.props.onSubmit(item, this.props.isEditForm);
    }

    private onCancel = () => {
        this.props.hide();
    }

    private delete = () => {
        this.props.onDelete(this.props.editableModel.id);
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let key: string = e.target.name;
        switch (key) {
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
                React.createElement('h4', {}, this.props.isEditForm ? 'Редактируем' : 'Создаем'),
                React.createElement('form', { onSubmit: this.onSubmit, style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } },
                    this.props.isEditForm
                        ? this.buildFormItem(
                            'ID',
                            React.createElement('input', { name: 'id', value: this.props.editableModel.id, type: 'text', readOnly: true })
                        )
                        : null,
                    this.buildFormItem(
                        'ID родителя',
                        React.createElement('input', { name: 'parentId', value: this.state.parentId ?? this.props.parentId ?? '', onClick: this.props.showSelectParentModal, type: 'text', readOnly: true })
                    ),
                    this.buildFormItem(
                        'Наименование',
                        React.createElement('input', { name: 'name', value: this.state.name ?? this.props.editableModel?.name ?? '', onChange: this.handleChange, type: 'text' })
                    ),
                    this.buildFormItem(
                        'Порядок',
                        React.createElement('input', { name: 'orderIndex', value: this.state.orderIndex ?? this.props.editableModel?.orderIndex ?? 0, onChange: this.handleChange, type: 'number' })
                    ),
                    this.buildFormItem(
                        'Внешний URL',
                        React.createElement('input', { name: 'externalUrl', value: this.state.externalUrl ?? this.props.editableModel?.externalUrl ?? '', onChange: this.handleChange, type: 'text' })
                    ),
                    this.buildFormItem(
                        'ID страницы',
                        React.createElement('input', { name: 'internalPageId', value: this.state.internalPageId ?? this.props.editableModel?.internalPageId ?? '', onChange: this.handleChange, type: 'text' })
                    ),
                    this.buildFormItem(
                        'Параметры',
                        React.createElement(Params, { paramsString: this.state.parametersObjectJson ?? this.props.editableModel?.parametersObjectJson, onChange: this.handleParamsChange })
                    ),
                    React.createElement('div', { style: { display: 'flex' } },
                        React.createElement('button', { type: 'submit' }, 'Сохранить'),
                        React.createElement('button', { type: 'button', onClick: this.onCancel }, 'Отмена'),
                        this.props.isEditForm
                            ? React.createElement('button', { type: 'button', onClick: this.delete }, 'Удалить')
                            : null
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

///
/// SELECT PARENT MODAL
///

interface ISelectParentModalProps {
    onSelect(parentId: string): void;
    hide(): void;
}

interface ISelectParentModalState {
    roots: MenuItemDTO[]
}

class SelectParentModal extends React.Component<ISelectParentModalProps, ISelectParentModalState> {

    constructor(props: ISelectParentModalProps) {
        super(props);
        this.state = {
            roots: null
        }
    }

    componentDidMount() {
        let context = this.context as IApplicationContext;
        store.getRoots()
            .then(
                roots => { this.setState({ roots }) },
            )
            .catch(context.contextController.setError);
    }

    render() {
        return [
            React.createElement('div', { onClick: this.props.hide, style: { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,.24)' }, key: 'back' }),
            React.createElement('div', { style: { position: 'fixed', top: '40px', right: '40px', bottom: '40px', left: '40px', backgroundColor: 'white' }, key: 'modal' },
                this.state.roots
                    ? this.state.roots.length > 0
                        ? React.Children.toArray(this.state.roots.map(item =>
                            React.createElement(ParentItem, { item, onSelect: this.props.onSelect })
                        ))
                        : 'Список пуст'
                    : null
            )
        ];
    }
}

/// PARENT ITEM

interface IParentItemProps {
    item: MenuItemDTO;
    onSelect(parentId: string): void;
}

interface IParentState {
    children: MenuItemDTO[];
}

class ParentItem extends React.Component<IParentItemProps, IParentState> {

    constructor(props: IParentItemProps) {
        super(props);
        this.state = { children: null }
    }

    select = () => {
        this.props.onSelect(this.props.item.id);
    }

    fetchChildren = () => {
        let context = this.context as IApplicationContext;
        store.getChildren(this.props.item.id)
            .then(
                children => this.setState({ children }),
            )
            .catch(context.contextController.setError);
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', { style: { display: 'flex' } },
                    this.state.children
                        ? React.createElement('span', { style: { transform: 'rotate(90deg)' } }, '>')
                        : null,
                    React.createElement('span', { onClick: this.fetchChildren }, this.props.item.name),
                    React.createElement('span', { onClick: this.select }, ' [Выбрать]')
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', paddingLeft: '2rem' } },
                    this.state.children
                        ? this.state.children.length > 0
                            ? React.Children.toArray(this.state.children.map(item =>
                                React.createElement(ParentItem, { item, onSelect: this.props.onSelect })
                            ))
                            : 'Список пуст'
                        : null
                ))
        );
    }
}


///
/// PARAMS
///

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

class Params extends React.Component<IParamsProps, IParamsState> {
    items: ParamModel[];

    constructor(props: IParamsProps) {
        super(props);
        this.items = this.props.paramsString ? JSON.parse(this.props.paramsString) as ParamModel[] : [];
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

/// PARAMS ITEM

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

