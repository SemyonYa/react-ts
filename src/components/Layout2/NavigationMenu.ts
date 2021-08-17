import * as React from 'react';
import { APPLICATION_CONTEXT, IApplicationContext } from '../../context/IApplicationContext';
import { DisplayedMenuItemDTO } from '../../models/DisplayedMenuItemDTO';
import { DisplayedMenuItemsStore } from '../../store/DisplayedMenuItemsStore';

interface INavigationMenuProps {
    currentPageId: any;
    menuId: any;
    menuItemsStore: DisplayedMenuItemsStore;
}

interface INavigationMenuState {
    shown: boolean;
}

export class NavigationMenu extends React.PureComponent<INavigationMenuProps, INavigationMenuState> {
    constructor(props: INavigationMenuProps) {
        super(props);
        this.state = { shown: true };
    }

    render() {
        return this.state.shown
            ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column' }, className: 'verticalMenu' },
                React.createElement('button', { onClick: this.hide }, 'Скрыть меню'),
                React.createElement(NavigationMenuItems, { model: [], currentPageId: this.props.currentPageId, menuId: this.props.menuId, menuItemsStore: this.props.menuItemsStore, parentId: null }))
            : React.createElement('button', { onClick: this.show }, 'Показать меню');
    }

    private hide = () => this.setState({ shown: false });

    private show = () => this.setState({ shown: true });
}

interface INavigationMenuItemsProps {
    model: DisplayedMenuItemDTO[];
    currentPageId: any;
    parentId: any;
    menuId: any;
    menuItemsStore: DisplayedMenuItemsStore;
}

interface INavigationMenuItemsState {
    items: DisplayedMenuItemDTO[];
}

class NavigationMenuItems extends React.PureComponent<INavigationMenuItemsProps, INavigationMenuItemsState> {
    private getOnChildrenLoadedListener(menuItemId: any) {
        return (items: DisplayedMenuItemDTO[]) => {
            this.setState({
                items: this.state.items.map((item) => {
                    if (item.id == menuItemId) {
                        item.displayedChildren = items;
                    }

                    return item;
                })
            });
        }
    }

    private getMenuOnExpandListener(item: DisplayedMenuItemDTO) {
        return (e: Event) => {
            e.preventDefault();

            if (item.externalUrl) {
                window.open(item.externalUrl);
            }
            else if (item.internalPageId) {
                let context = this.context as IApplicationContext;
                let paramsObj = JSON.parse(item.parametersObjectJson);

                context.changePage(item.internalPageId, paramsObj);
            }
            else {
                let context = this.context as IApplicationContext;
                context.displayLoadingScreen();

                this.props.menuItemsStore.getChildren(this.props.parentId).then(this.getOnChildrenLoadedListener(item.id)).catch(context.contextController.setError);
            }
        }
    }

    private getOnCollapseListener(menuItem: DisplayedMenuItemDTO) {
        return (e: Event) => {
            e.preventDefault();

            this.setState({
                items: this.state.items.map((item) => {
                    if (item.id == menuItem.id) {
                        item.displayedChildren = [];
                    }

                    return item;
                })
            });
        }
    }

    private updateItems = (items: DisplayedMenuItemDTO[]) => {
        let context = this.context as IApplicationContext;

        context.hideLoadingScreen();
        this.setState({ items: items.sort((item1, item2) => { return item1.orderIndex - item2.orderIndex; }) });
    }

    constructor(props: INavigationMenuItemsProps) {
        super(props);

        this.state = { items: this.props.model };
    }

    componentDidMount() {
        if (this.props.model.length == 0) {
            let context = this.context as IApplicationContext;
            context.displayLoadingScreen();

            if (this.props.parentId) {
                this.props.menuItemsStore.getChildren(this.props.parentId).then(this.updateItems).catch(context.contextController.setError);
            }
            else {
                this.props.menuItemsStore.getPageMenu(this.props.menuId, this.props.currentPageId).then(this.updateItems).catch(context.contextController.setError);
            }
        }
    }

    render() {
        return React.createElement('ul', {},
            this.state.items.map((menuItem) => {
                let isActive = menuItem.internalPageId == this.props.currentPageId;

                return React.createElement('li', { key: menuItem.id, className: isActive ? 'activeMenuItem' : null },
                    React.createElement('a', { onClick: menuItem.displayedChildren.length == 0 ? this.getMenuOnExpandListener(menuItem) : this.getOnCollapseListener(menuItem), href: '' }, menuItem.name),
                    menuItem.displayedChildren.length == 0 ?
                        null :
                        React.createElement(NavigationMenuItems, { model: menuItem.displayedChildren, currentPageId: this.props.currentPageId, menuId: this.props.menuId, menuItemsStore: this.props.menuItemsStore, parentId: menuItem.id })
                )
            }));
    }
}

NavigationMenuItems.contextType = APPLICATION_CONTEXT;