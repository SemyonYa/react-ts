import React from 'react';
import * as axios from 'axios';
import { ISectionProps } from './ISectionProps';
import { Item } from './Item';
import { Pagination } from './Pagination';
import { RoutePartDetailsDTO } from './RoutePartDetailsDTO';

export enum FetchStatus {
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
    // TODO: baseUrl
    baseUrl: string = 'qweqwe';

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
        this.fetchRoots();
    }

    // // DATA
    // private getRoots(): Promise<RoutePartDetailsDTO[]> {
    //     return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
    //         axios.default.get<RoutePartDetailsDTO[]>(this.baseUrl + `/api/Configuration/Routes/search/${currentValue?.trim()}`)

    //     })
    // }

    private changePage = (page: number) => {
        this.setState({ pageNumber: page })
        this.fetchRoots(page);
    }

    // TODO: rebuild children
    private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue: string = e.target.value;
        this.setState({ searchValue: currentValue });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        if (currentValue?.trim()) {
            this.currentTimeout = setTimeout(() => {
                this.setState({ status: FetchStatus.InProgress });
                // TODO: remove
                this._search(currentValue?.trim())
                    // axios.default.get<RoutePartDetailsDTO[]>(this.baseUrl + `/api/Configuration/Routes/search/${currentValue?.trim()}`)
                    .then(response => {
                        console.log("🚀 ~ file: RouteViewer.ts ~ line 67 ~ RouteViewer ~ this.currentTimeout=setTimeout ~ response", response)
                        this.setState({ routes: response, pageNumber: 1, status: FetchStatus.Fetched });
                        this.forceUpdate();
                    });
            }, 500);
        }
    }

    private onPageSizeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const currentValue: number = +e.currentTarget.value;
            this.setState({ pageSize: currentValue });
            this.fetchRoots(1);
        }
    }

    private fetchRoots = (pageNumber: number = null) => {
        this.setState({ status: FetchStatus.InProgress });
        // TODO: remove
        this._list(pageNumber ?? this.state.pageNumber, this.state.pageSize)
            // axios.default.get<RoutePartDetailsDTO[]>(this.baseUrl + `/api/Configuration/Routes?pageNumber=${pageNumber}&pageSize=${this.state.pageSize}`)
            .then((response) => {
                this.setState({ routes: response, status: FetchStatus.Fetched })
            });
    }

    render() {
        let component: React.ReactNode;
        switch (this.state.status) {
            case FetchStatus.InProgress:
                component = React.createElement('span', {}, 'in progress');
                break;
            case FetchStatus.Fetched:
                component = this.state.routes.length > 0
                    ? React.Children.toArray(this.state.routes.map(route =>
                        React.createElement(Item, { route, baseUrl: this.baseUrl }),
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
            }, 700);
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
            }, 700);
        })
    }
}
