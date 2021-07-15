import React from 'react';
import { ISectionProps } from './ISectionProps';
import { Item } from './Item';
import { Pagination } from './Pagination';
import { RoutePartDetailsDTO } from './RoutePartDetailsDTO';


export enum FetchStatus {
    Initial,
    InProgress,
    Fetched,
    Failed
}

interface IRouterViewState {
    searchValue: string;
    pageSize: number;
    pageNumber: number;
    routes: RoutePartDetailsDTO[],
    status: FetchStatus
}

export class RouteViewer extends React.PureComponent<ISectionProps, IRouterViewState> {
    currentTimeout: any;

    constructor(props: ISectionProps) {
        super(props);
        this.state = {
            searchValue: '',
            pageSize: 2,
            pageNumber: 1,
            routes: [],
            status: FetchStatus.InProgress
        };
    }

    componentDidMount() {
        this.fetchRoutes();
    }

    private changePage = (page: number) => {
        // TODO: 
        this.setState({ pageNumber: page })
        this.fetchRoutes(page);
    }

    private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue: string = e.target.value;
        this.setState({ searchValue: currentValue });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
            this.setState({ status: FetchStatus.InProgress });
            // TODO: /api/Configuration/Routes/search/{searchText}
            this._search(currentValue?.trim()).then(
                routes => {
                    this.setState({ routes, pageNumber: 1, status: FetchStatus.Fetched })
                }
            );
        }, 500);
    }

    private onPageSizeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const currentValue: number = +e.currentTarget.value;
            this.setState({ pageSize: currentValue });
            this.fetchRoutes(1);
        }
    }

    private fetchRoutes = (pageNumber: number = null) => {
        // TODO: fetch states
        this.setState({ status: FetchStatus.InProgress });
        // TODO: /api/Configuration/Routes?pageNumber={pageNumber}&pageSize={pageSize
        this._list(pageNumber ?? this.state.pageNumber, this.state.pageSize).then(
            (routes) => {
                this.setState({ routes, status: FetchStatus.Fetched })
            }
        );
    }

    render() {
        let component;
        switch (this.state.status) {
            case FetchStatus.InProgress:
                component = React.createElement('span', {}, 'in progress');
                break;
            case FetchStatus.Fetched:
                component = this.state.routes.length > 0
                    ? React.Children.toArray(this.state.routes.map(route =>
                        React.createElement(Item, { route }),
                    ))
                    : React.createElement('span', {}, 'empty list');
                break;
            case FetchStatus.Failed:
                component = React.createElement('span', {}, 'failed');
                break;
            default:
                component = null;
                break;
        }
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', maxWidth: '25rem', marginTop: '5rem' } },
                React.createElement('input', { onChange: this.onSearchChange, value: this.state.searchValue, placeholder: 'search' }),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } }, component),
                (this.state.status === FetchStatus.Fetched)
                    ? React.createElement('a', { href: '/Admin/PageEditor' }, 'Новая страница')
                    : null,
                React.createElement('input', { onKeyDown: this.onPageSizeSubmit, placeholder: 'page size', type: 'number' }),
                React.createElement(Pagination, {
                    onChange: this.changePage,
                    // TODO: routes.lenth - incorrect. API response...
                    pageQty: Math.ceil(this.state.routes.length / this.state.pageSize),
                    pageNumber: this.state.pageNumber
                })
            )
        );
    }


    ///
    /// FAKE REQUESTS
    private _list(pageNumber: number = 1, pageSize: number = 10): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: '1', name: 'Route 1', isPage: false, children: [] } as RoutePartDetailsDTO,
                    { id: '2', name: 'Route 2', isPage: false, children: [] } as RoutePartDetailsDTO,
                    { id: '3', name: 'Route 3', isPage: false, children: [] } as RoutePartDetailsDTO,
                ]);
            }, 2000);
        })
    }

    private _search(search: string): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1', name: 'Route 1', isPage: false, children: [
                            {
                                id: '1-1', name: 'Route 2', isPage: false, children: [
                                    { id: '1-1-1', name: `${search} - third level`, isPage: false, children: [] } as RoutePartDetailsDTO,
                                ]
                            } as RoutePartDetailsDTO,
                        ]
                    } as RoutePartDetailsDTO,
                    {
                        id: '2', name: 'Route 2', isPage: false, children: [
                            { id: '2-1', name: `${search} - second level`, isPage: false, children: [] } as RoutePartDetailsDTO,
                        ]
                    } as RoutePartDetailsDTO,
                    { id: '3', name: `${search} - top level`, isPage: false, children: [] } as RoutePartDetailsDTO,
                ]);
            }, 2000);
        })
    }
}
