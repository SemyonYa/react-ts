import { MainMenuStore } from '../store/MainMenuStore';
import React from 'react';
import { MenuItemDTO } from '../models/MenuItemDTO2';
import { APPLICATION_CONTEXT, IApplicationContext } from '../context/IApplicationContext';

const store = new MainMenuStore();

interface IMainMenuProps {
    isAdmin: boolean;
}

interface IMainMenuState {
    shown: boolean;
    roots: MenuItemDTO[];
}

export class MainMenu extends React.PureComponent<IMainMenuProps, IMainMenuState> {

    constructor(props: IMainMenuProps) {
        super(props);
        this.state = {
            shown: true,
            roots: [],
        };
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            this.state.shown
                ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement('div', { onClick: this.hide }, 'Скрыть меню'),
                    this.state.roots.length > 0
                        ? React.Children.toArray(this.state.roots.map(model =>
                            React.createElement(MainMenuItem, { model }),
                        ))
                        : 'empty list',
                    this.props.isAdmin
                        ? React.createElement('a', { href: '#' }, 'Панель администратора')
                        : null
                )
                : React.createElement('div', { onClick: this.show }, 'Показать меню')
        );
    }

    private hide = () => this.setState({ shown: false });

    private show = () => this.setState({ shown: true });

    private fetch = () => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        store.getRoots()
            .then(
                roots => {
                    this.setState({ roots: roots.sort((r1, r2) => r1.orderIndex - r2.orderIndex), })
                    context.hideLoadingScreen();
                }
            )
            .catch(context.contextController.setError);
    }
}

MainMenu.contextType = APPLICATION_CONTEXT;

/// 
///  MAIN MENU ITEM
/// 

interface IMainMenuItemProps {
    model: MenuItemDTO;
}

interface IMainMenuItemState {
    children: MenuItemDTO[];
}

class MainMenuItem extends React.PureComponent<IMainMenuItemProps, IMainMenuItemState> {

    constructor(props: IMainMenuItemProps) {
        super(props);
        this.state = {
            children: null,
        };
    }

    private showChildren = () => {
        if (this.props.model.internalPageId || this.props.model.externalUrl) {
            let location = this.props.model.internalPageId ? '/go/to/page/' + this.props.model.internalPageId : this.props.model.externalUrl;
            if (this.props.model.parametersObjectJson) {
                location += '?';
                const paramsObj = JSON.parse(this.props.model.parametersObjectJson)
                const paramsArr: string[] = [];
                for (let item in paramsObj as Map<string, any>) {
                    paramsArr.push(`${item}=${paramsObj[item]}`);
                }
                location += paramsArr.join('&');
            }
            window.location.href = location;
        } else {
            this.fetchChildren(this.props.model.id);
        }
    }

    private hideChildren = () => {
        this.setState({ children: null });
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', { style: { display: 'flex' } },
                    this.state.children && this.state.children?.length > 0
                        ? React.createElement('div', { onClick: this.hideChildren, style: { transform: 'rotate(90deg)' } }, '>')
                        : null,
                    React.createElement('div', { onClick: this.showChildren }, this.props.model.name),
                ),
                React.createElement('div', { style: { paddingLeft: '2rem' } },
                    this.state.children
                        ? this.state.children.length > 0
                            ? React.Children.toArray(this.state.children.map(model =>
                                React.createElement(MainMenuItem, { model }),
                            ))
                            : 'empty list'
                        : null
                )
            )
        );
    }

    private fetchChildren = (parentId: string) => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        store.getChildren(parentId)
            .then(
                children => {
                    this.setState({ children: children.sort((ch1, ch2) => ch1.orderIndex - ch2.orderIndex) });
                    context.hideLoadingScreen();
                }
            )
            .catch(context.contextController.setError);
    }
}

MainMenuItem.contextType = APPLICATION_CONTEXT;