import React, { ChangeEvent } from "react";
import { APPLICATION_CONTEXT, IApplicationContext } from "../context/IApplicationContext";
import { NavigationMenuDTO } from "../models/NavigationMenuDTO";
import { MenuEditingService } from "../store/MenuEditingService";

interface IMenuEditorProps {
    baseUrl: string;
}

interface IMenuEditorState {
    items: NavigationMenuDTO[];
    isCreate: boolean;
}

export class MenuEditor extends React.Component<IMenuEditorProps, IMenuEditorState> {
    store: MenuEditingService;
    constructor(props: IMenuEditorProps) {
        super(props);
        this.store = new MenuEditingService(props.baseUrl);
        this.state = {
            items: [],
            isCreate: false
        }
    }

    componentDidMount() {
        this.fetch();
    }

    private fetch = () => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        this.store.get()
            .then(
                items => {
                    this.setState({ items });
                    context.hideLoadingScreen();
                }
            )
            .catch(context.contextController.setError);
    }

    private showCreate = () => {
        this.setState({ isCreate: true })
    }

    private hideCreate = () => {
        this.setState({ isCreate: false })
    }

    private saveItem = (name: string) => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        this.store.create({ name } as NavigationMenuDTO)
            .then(() => {
                this.hideCreate();
                this.fetch();
            })
            .catch(context.contextController.setError)
    }

    private deleteItem = (id: string) => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        this.store.delete(id)
            .then(() => {
                this.fetch();
            })
            .catch(context.contextController.setError);
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } },
                !this.state.isCreate
                    ? React.createElement('button', { onClick: this.showCreate }, 'Добавить секцию')
                    : React.createElement(Create, { onSave: this.saveItem }),
                React.Children.toArray(
                    this.state.items.map(item =>
                        React.createElement(Item, { item, onDelete: this.deleteItem })
                    )
                )
            )
        );
    }
}

///
/// ITEM
///
interface IItemProps {
    item: NavigationMenuDTO;
    onDelete(id: string): void;
}
interface IItemState {
    isHover: boolean;
}
class Item extends React.Component<IItemProps, IItemState> {

    constructor(props: IItemProps) {
        super(props);
        this.state = { isHover: false };
    }

    showDeleteBtn = () => {
        this.setState({ isHover: true });
    }

    hideDeleteBtn = () => {
        this.setState({ isHover: false });
    }

    delete = () => {
        this.props.onDelete(this.props.item.id);
    }

    render() {
        return (
            React.createElement('li', { onMouseEnter: this.showDeleteBtn, onMouseLeave: this.hideDeleteBtn },
                this.props.item.name,
                this.state.isHover
                    ? React.createElement('button', { onClick: this.delete }, 'x')
                    : null
            )
        );
    }
}

/// 
/// CREATE
/// 
interface ICreateProps {
    onSave(name: string): void;
}
interface ICreateState {
    name: string;
}

class Create extends React.Component<ICreateProps, ICreateState> {

    constructor(props: ICreateProps) {
        super(props);
        this.state = { name: '' }
    }

    private changeName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        this.setState({ name });
    }

    private save = () => {
        this.props.onSave(this.state.name);
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex' } },
                React.createElement('input', { value: this.state.name, onChange: this.changeName, autoFocus: true }),
                React.createElement('button', { type: 'button', onClick: this.save }, 'Сохранить')
            )
        );
    }
}

MenuEditor.contextType = APPLICATION_CONTEXT;