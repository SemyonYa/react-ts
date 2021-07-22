import * as axios from 'axios';
import React from 'react';
import { MenuItemDTO } from '../models/MenuItemDTO2';
import { CreateForm } from './CreateForm';
import { EditForm } from './EditForm';

///
/// Параметр isLink
/// Изменение родительского элемента: модальное окно (нужно динамически подгружать children)
///

enum FetchStatus {
    InProgress,
    Fetched,
    Failed
}

enum FormType {
    create,
    edit
}

interface IMainMenuEditorProps {
}

interface IMainMenuEditorState {
    status: FetchStatus;
    roots: MenuItemDTO[];
    editableItem: MenuItemDTO;
    formType: FormType;
    parentId: string;
}

export class MainMenuEditor extends React.PureComponent<IMainMenuEditorProps, IMainMenuEditorState> {
    // TODO: set real base url or get from props
    private baseUrl: string = 'https://qwe.rty';
    constructor(props: IMainMenuEditorProps) {
        super(props);
        this.state = {
            roots: [],
            status: FetchStatus.Fetched,
            editableItem: null,
            formType: null,
            parentId: null
        };
    }

    componentDidMount() {
        this.fetch();
    }

    private fetch = () => {
        this.setState({ status: FetchStatus.InProgress });
        // axios.default.get(this.baseUrl + '/api/Configuration/Menu')
        this._roots()
            .then(
                roots => this.setState({ roots: roots.sort((r1, r2) => r1.orderIndex - r2.orderIndex), status: FetchStatus.Fetched }),
                reason => this.setState({ status: FetchStatus.Failed })
            );
    }

    private toggleForm = (formType: FormType, editableItem: MenuItemDTO = null, parentId = null) => {
        this.setState({ editableItem, formType, parentId });
    }

    private showCreateForm = () => {
        this.toggleForm(FormType.create);
    }

    private hideForm = () => {
        this.toggleForm(null);
    }

    private createItem = (item: MenuItemDTO) => {
        console.log(item);
        axios.default.post(`${this.baseUrl}/api/Configuration/Menu/`, item)
            .then(
                res => console.log(res),
                reason => console.log(reason)
            );
    }

    private updateItem = (item: MenuItemDTO) => {
        console.log(item);
        axios.default.put(`${this.baseUrl}/api/Configuration/Menu/${item.id}`, item)
            .then(
                res => console.log(res),
                reason => console.log(reason)
            );
    }

    private deleteItem = (item: MenuItemDTO) => {
        console.log(item);
        axios.default.delete(`${this.baseUrl}/api/Configuration/Menu/${item.id}`)
            .then(
                res => console.log(res),
                reason => console.log(reason)
            );
    }

    render() {
        // TREE
        let treeComponent: React.ReactNode;
        switch (this.state.status) {
            case FetchStatus.Fetched:
                if (this.state.roots) {
                    treeComponent = this.state.roots.length > 0
                        ? React.Children.toArray(
                            [
                                ...this.state.roots.map(model =>
                                    React.createElement(MainMenuEditorItem, { model, baseUrl: this.baseUrl, toggleForm: this.toggleForm }),
                                ),
                                React.createElement('div', { onClick: this.showCreateForm }, '[+]')
                            ]
                        )
                        : 'empty list';
                } else {
                    treeComponent = null
                }
                break;
            case FetchStatus.InProgress:
                treeComponent = 'in progress';
                break;
            case FetchStatus.Failed:
                treeComponent = 'failed';
                break;
            default:
                break;
        }

        // FORM
        let editorComponent: React.ReactNode;
        switch (this.state.formType) {
            case FormType.create:
                editorComponent = React.createElement(CreateForm, { parentId: this.state.parentId, hide: this.hideForm, onCreate: this.createItem })
                break;
            case FormType.edit:
                editorComponent = React.createElement(EditForm, { model: this.state.editableItem, onUpdate: this.updateItem, onDelete: this.deleteItem })
                break;
            default:
                editorComponent = null;
                break;
        }

        return (
            React.createElement('div', { style: { display: 'flex' } },
                React.createElement('div', { style: { flex: '0 1 50%' } },
                    treeComponent,
                ),
                React.createElement('div', { style: { flex: '0 1 50%' } },
                    editorComponent
                ),
            )
        );
    }

    // TODO: DELETE
    //          FAKE DATA
    private _roots = (): Promise<MenuItemDTO[]> => {
        return new Promise<MenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([1, 2, 3].map(i => {
                        return { id: i, name: `Item ${i}`, orderIndex: i } as MenuItemDTO;
                    }));
                }, 400);
            }
        );
    }
}

/// 
///  MAIN MENU ITEM
/// 

interface IMainMenuEditorItemProps {
    model: MenuItemDTO;
    baseUrl: string;
    toggleForm(editorType: FormType, editableItem?: MenuItemDTO, parentId?: string): void;
}

interface IMainMenuEditorItemState {
    status: FetchStatus;
    children: MenuItemDTO[];
}

class MainMenuEditorItem extends React.PureComponent<IMainMenuEditorItemProps, IMainMenuEditorItemState> {

    constructor(props: IMainMenuEditorItemProps) {
        super(props);
        this.state = {
            children: null,
            status: FetchStatus.Fetched
        };

    }

    render() {
        let component: React.ReactNode;
        switch (this.state.status) {
            case FetchStatus.Fetched:
                if (this.state.children) {
                    component = this.state.children.length > 0
                        ? React.Children.toArray(
                            [
                                ...this.state.children.map(model =>
                                    React.createElement(MainMenuEditorItem, { model, baseUrl: this.props.baseUrl, toggleForm: this.props.toggleForm }),
                                ),
                                React.createElement('div', { onClick: this.create }, '[+]')
                            ]
                        )
                        : 'empty list';
                } else {
                    component = null
                }
                break;
            case FetchStatus.InProgress:
                component = 'in progress';
                break;
            case FetchStatus.Failed:
                component = 'failed';
                break;
            default:
                break;
        }
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', { style: { display: 'flex' } },
                    React.createElement('div', { onClick: this.fetchChildren }, this.props.model.name),
                    React.createElement('div', { onClick: this.edit }, '[edit]'),
                ),
                React.createElement('div', { style: { paddingLeft: '2rem' } }, component),
            )
        );
    }

    private fetchChildren = () => {
        this.setState({ status: FetchStatus.InProgress });
        // TODO: 
        // axios.default.get(this.props.baseUrl + '/api/Configuration/Menu/' + parentId)
        this._children(this.props.model.id)
            .then(
                children => this.setState({ children: children.sort((ch1, ch2) => ch1.orderIndex - ch2.orderIndex), status: FetchStatus.Fetched }),
                reason => this.setState({ status: FetchStatus.Failed })
            );
    }

    private edit = () => {
        this.props.toggleForm(FormType.edit, this.props.model);
    }

    private create = () => {
        this.props.toggleForm(FormType.create, null, this.props.model.id);
    }



    ///
    /// TODO: delete
    ///
    private _children = (parentId: string): Promise<MenuItemDTO[]> => {
        return new Promise<MenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([1, 2, 3].map(i => {
                        return {
                            id: `${parentId}-${i}`,
                            name: `Item ${parentId}-${i}`,
                            orderIndex: i,
                            internalPageId: parentId.length >= 3 ? `${parentId}-${i}` : null
                        } as MenuItemDTO;
                    }));
                }, 400);
            }
        )
    }
}