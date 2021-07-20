import * as axios from 'axios';
import React from 'react';
import { MainMenuItem } from './MainMenuItem';
import { MenuItemDTO } from './MenuItemDTO';

///
/// Параметр isLink
/// Изменение родительского элемента: модальное окно (нужно динамически подгружать children)
///

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
    // TODO: set real base url or get from props
    private baseUrl: string = 'https://qwe.rty';
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
                            React.createElement(MainMenuItem, { model, baseUrl: this.baseUrl }),
                        ))
                        : React.createElement('span', {}, 'empty list');
                } else {
                    component = null
                }
                break;
            case FetchStatus.InProgress:
                component = React.createElement('span', {}, 'in progress');
                break;
            case FetchStatus.Failed:
                component = React.createElement('span', {}, 'failed');
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
        // axios.default.get(this.baseUrl + '/api/Configuration/Menu')
        this._roots()
            .then(
                roots => this.setState({ roots: roots.sort((r1, r2) => r1.orderIndex - r2.orderIndex), status: FetchStatus.Fetched }),
                reason => this.setState({ status: FetchStatus.Failed })
            );
    }

    private _roots = (): Promise<MenuItemDTO[]> => {
        return new Promise<MenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([1, 2, 3].map(i => {
                        return { id: i, name: `Item ${i}`, orderIndex: i } as MenuItemDTO;
                    }));
                }, 1000);
            }
        );
    }

}