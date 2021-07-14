import React from 'react';
import { ISectionProps } from './ISectionProps';
import { Item } from './Item';
import { Pagination } from './Pagination';
import { RoutePartDetailsDTO } from './RoutePartDetailsDTO';

interface IRouterViewState {
    searchValue: string;
    pageSize: number;
    pageNumber: number;
    routes: RoutePartDetailsDTO[]
}

export class RouteViewer extends React.PureComponent<ISectionProps, IRouterViewState> {
    currentTimeout: any;

    constructor(props: ISectionProps) {
        super(props);
        this.state = {
            searchValue: '',
            pageSize: 10,
            pageNumber: 1,
            routes: []
        };
    }

    componentDidMount() {
        this.fetchRoutes();
    }

    private changePage = (page: number) => {
        this.setState({ pageNumber: page })
    }

    private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue: string = e.target.value;
        this.setState({ searchValue: currentValue });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
            console.log('TODO: search', currentValue);
        }, 500);
    }

    private onPageSizeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const currentValue: number = +e.currentTarget.value;
            // this.setState({ pageSize: currentValue });
            this.fetchRoutes(this.state.pageNumber, currentValue);
            // console.log('TODO: page size', currentValue);
        }
    }

    private fetchRoutes = (pageNumber: number = 1, pageSize: number = 10) => {
        // TODO: Real data
        this._list(pageNumber, pageSize).then(
            (routes) => {
                this.setState({ routes, pageSize, pageNumber })
            }
        );
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', maxWidth: '25rem', marginTop: '5rem' } },
                React.createElement('input', { onChange: this.onSearchChange, value: this.state.searchValue, placeholder: 'search' }),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    this.state.routes.length > 0
                        ? React.Children.toArray(this.state.routes.map(route =>
                            React.createElement(Item, { route }),
                        ))
                        : React.createElement('span', {}, 'empty list'),
                ),
                React.createElement('input', { onKeyDown: this.onPageSizeSubmit, placeholder: 'page size', type: 'number' }),
                React.createElement(Pagination, { onChange: this.changePage, pageQty: 10, pageNumber: this.state.pageNumber })
            )
        );
    }

    ///
    ///
    ///
    /// FAKE REQUESTS
    private _list(pageNumber: number = 1, pageSize: number = 10): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: 'dqwd', name: 'Route 1', isPage: false, children: [] } as RoutePartDetailsDTO,
                    {
                        id: 'dqwd', name: 'Route 2', isPage: false, children: [
                            { id: 'dqwd', name: 'Route 2-1', isPage: false, children: [] } as RoutePartDetailsDTO,
                            {
                                id: 'dqwd', name: 'Route 2-2', isPage: false, children: [
                                    { id: 'dqwd', name: 'Route 2-2-1', isPage: false, children: [] } as RoutePartDetailsDTO,
                                    { id: 'dqwd', name: 'Route 2-2-2', isPage: false, children: [] } as RoutePartDetailsDTO,
                                    { id: 'dqwd', name: 'Route 2-2-3', isPage: false, children: [] } as RoutePartDetailsDTO
                                ]
                            } as RoutePartDetailsDTO
                        ]
                    } as RoutePartDetailsDTO
                ]);
            }, 2000);
        })
    }

    private _children(parentId: string): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([]);
            }, 2000);
        })
    }
    private _search(search: string): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([]);
            }, 2000);
        })
    }
}