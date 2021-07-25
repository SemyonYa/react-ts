import { MainMenuStore } from '../store/MainMenuStore';
import React from 'react';
import { MenuItemDTO } from '../models/MenuItemDTO2';

const store = new MainMenuStore();

export enum FetchStatus {
    InProgress,
    Fetched,
    Failed
}

interface IMainMenuProps {
    isAdmin: boolean;
}

interface IMainMenuState {
    shown: boolean;
    status: FetchStatus;
    roots: MenuItemDTO[];
}

export class MainMenu extends React.PureComponent<IMainMenuProps, IMainMenuState> {

    constructor(props: IMainMenuProps) {
        super(props);
        this.state = {
            shown: true,
            roots: [],
            status: FetchStatus.Fetched
        };
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        let component: React.ReactNode;
        switch (this.state.status) {
            case FetchStatus.Fetched:
                if (this.state.roots) {
                    component = this.state.roots.length > 0
                        ? React.Children.toArray(this.state.roots.map(model =>
                            React.createElement(MainMenuItem, { model }),
                        ))
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
            this.state.shown
                ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement('div', { onClick: this.hide }, 'Скрыть меню'),
                    component,
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
        this.setState({ status: FetchStatus.InProgress });
        store.getRoots()
            .then(
                roots => this.setState({ roots: roots.sort((r1, r2) => r1.orderIndex - r2.orderIndex), status: FetchStatus.Fetched }),
                reason => this.setState({ status: FetchStatus.Failed })
            );
    }

}

/// 
///  MAIN MENU ITEM
/// 

interface IMainMenuItemProps {
    model: MenuItemDTO;
}

interface IMainMenuItemState {
    status: FetchStatus;
    children: MenuItemDTO[];
}

export class MainMenuItem extends React.PureComponent<IMainMenuItemProps, IMainMenuItemState> {

    constructor(props: IMainMenuItemProps) {
        super(props);
        this.state = {
            children: null,
            status: FetchStatus.Fetched
        };

    }

    private showChildren = () => {
        if (this.props.model.internalPageId || this.props.model.externalUrl) {
            let location = this.props.model.internalPageId ? '/go/to/page/' + this.props.model.internalPageId : this.props.model.externalUrl;
            if (this.props.model.parametersObjectJson) {
                location += '?';
                const paramsObj = JSON.parse(this.props.model.parametersObjectJson)
                for (let item in paramsObj as Map<string, any>) {
                    location += `${item}=${paramsObj[item]}&`;
                }
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
        let component: React.ReactNode;
        switch (this.state.status) {
            case FetchStatus.Fetched:
                if (this.state.children) {
                    component = this.state.children.length > 0
                        ? React.Children.toArray(this.state.children.map(model =>
                            React.createElement(MainMenuItem, { model }),
                        ))
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
                    this.state.status === FetchStatus.Fetched && this.state.children?.length > 0
                        ? React.createElement('div', { onClick: this.hideChildren, style: { transform: 'rotate(90deg)' } }, '>')
                        : null,
                    React.createElement('div', { onClick: this.showChildren }, this.props.model.name),
                ),
                React.createElement('div', { style: { paddingLeft: '2rem' } }, component),
            )
        );
    }

    private fetchChildren = (parentId: string) => {
        this.setState({ status: FetchStatus.InProgress });
        store.getChildren(parentId)
            .then(
                children => this.setState({ children: children.sort((ch1, ch2) => ch1.orderIndex - ch2.orderIndex), status: FetchStatus.Fetched }),
                reason => this.setState({ status: FetchStatus.Failed })
            );
    }

}