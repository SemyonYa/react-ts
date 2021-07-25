import React from 'react';
import { MenuItemDTO } from '../models/MenuItemDTO2';
import { MainMenuStore } from '../store/MainMenuStore';

const store = new MainMenuStore();

interface ISelectParentModalProps {
    onSelect(parentId: string): void;
    hide(): void;
}

interface ISelectParentModalState {
    roots: MenuItemDTO[]
}

export class SelectParentModal extends React.Component<ISelectParentModalProps, ISelectParentModalState> {

    constructor(props: ISelectParentModalProps) {
        super(props);
        this.state = {
            roots: null
        }
    }

    componentDidMount() {
        store.getRoots()
            .then(
                roots => { this.setState({ roots }); console.log(roots) },
                reason => { console.log(reason) }
            );
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

///
/// ITEM
///

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
        store.getChildren(this.props.item.id)
            .then(
                children => this.setState({ children }),
                reason => { console.log(reason) }
            );
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
