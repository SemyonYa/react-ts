import React from 'react';
import * as axios from 'axios';
import { ISectionProps } from '../models/ISectionProps';
import { RoutePartDetailsDTO } from '../models/RoutePartDetailsDTO';

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
    baseUrl: string = 'http://qweqwe';

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
        this.fetch();
    }

    private changePage = (page: number) => {
        this.setState({ pageNumber: page });
        this.fetch();
    }

    private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue: string = e.target.value;
        this.setState({ searchValue: currentValue });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        if (currentValue?.trim()) {
            setTimeout(() => {
                this.setState({ pageNumber: 1 });
                this.fetch();
            }, 500);
        }
    }

    private onPageSizeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const currentValue: number = +e.currentTarget.value;
            this.setState({ pageSize: currentValue, pageNumber: 1 });
            this.fetch();
        }
    }

    // TODO: replace data
    private fetch = () => {
        this.setState({ status: FetchStatus.InProgress });
        let request: Promise<RoutePartDetailsDTO[]>;
        // let request: Promise<axios.AxiosResponse<RoutePartDetailsDTO[]>>;
        if (this.state.searchValue) {
            request = this._search(this.state.searchValue.trim());
            // request = axios.default.get<RoutePartDetailsDTO[]>(this.baseUrl + `/api/Configuration/Routes/search/${this.state.searchValue.trim()}?pageNumber=${pageNumber}&pageSize=${this.state.pageSize}`)
        } else {
            request = this._list(this.state.pageNumber, this.state.pageSize);
            // request = axios.default.get<RoutePartDetailsDTO[]>(this.baseUrl + `/api/Configuration/Routes?pageNumber=${pageNumber}&pageSize=${this.state.pageSize}`)
        }
        // request.then(
        //     response => {
        //         this.setState({ routes: response.data, status: FetchStatus.Fetched })
        //     }
        // );
        request.then(
            response => {
                this.setState({ routes: response, status: FetchStatus.Fetched })
            }
        );
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
    /// TODO: DELETE FAKE REQUESTS 
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


///
/// PAGINATION
///

interface IPaginationProps {
    pageQty: number;
    pageNumber: number;
    onChange(page: number): void;
}

class Pagination extends React.PureComponent<IPaginationProps> {

    render() {
        console.log(this.props);

        let pages: number[] = Array(this.props.pageQty).fill(0).map((_, i) => i + 1);
        return (
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                ...React.Children.toArray(pages.map(p =>
                    React.createElement(
                        'span',
                        {
                            onClick: () => this.onChange(p),
                            style: {
                                fontWeight: p === this.props.pageNumber ? '800' : '400',
                                fontSize: p === this.props.pageNumber ? '1.2rem' : '1rem',
                                cursor: 'pointer'
                            }
                        },
                        p
                    )
                ))
            )
        );
    }

    private onChange = (page: number) => {
        if (this.props.pageNumber !== page) {
            this.props.onChange(page);
        }
    }
}

///
/// ITEM
///

interface IItemProps {
    route: RoutePartDetailsDTO;
    baseUrl: string;
}

interface IItemState {
    status: FetchStatus;
}

class Item extends React.PureComponent<IItemProps, IItemState> {

    constructor(props: IItemProps) {
        super(props);
        this.state = {
            status: FetchStatus.Fetched
        }
    }

    render() {
        let component: React.ReactNode;
        console.log(this.props.route.id, this.props.route.children && this.props.route.children.length > 0);
        switch (this.state.status) {
            case FetchStatus.InProgress:
                component = React.createElement('span', {}, 'in progress');
                break;
            case FetchStatus.Fetched:
                component = this.props.route.children && this.props.route.children.length > 0
                    ? React.Children.toArray(this.props.route.children.map(route =>
                        React.createElement(Item, { route, baseUrl: this.props.baseUrl })
                    ))
                    : null
                break;
            case FetchStatus.Failed:
                component = React.createElement('span', {}, 'failed');
                break;
            default:
                component = null;
                break;
        }
        console.log(component);

        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', {},
                    this.props.route.isPage
                        ? React.createElement('a', { href: `#${this.props.route.id}`, onClick: () => this.goToPage(this.props.route.id) }, this.props.route.name)
                        : React.createElement('span', { onClick: this.fetchCHildren }, this.props.route.name)
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', paddingLeft: '2rem' } }, component),
            )
        );
    }

    fetchCHildren = () => {
        this.setState({ status: FetchStatus.InProgress });
        // TODO: /api/Configuration/Routes/{elementId}
        this._children(this.props.route.id)
            // axios.default.get<RoutePartDetailsDTO[]>(this.props.baseUrl + `/api/Configuration/Routes/${this.props.route.id}`)
            .then(
                response => {
                    this.props.route.children = response;
                    this.setState({ status: FetchStatus.Fetched });
                    this.forceUpdate();
                },
                reason => {
                    this.setState({ status: FetchStatus.Failed });
                }
            )
    }

    goToPage = (id: string) => {
        alert('go to page ' + id);
    }


    /// TODO: DELETE FAKE
    private _children(parentId: string): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3].map(
                    i => {
                        return { id: `${parentId}-${i}`, name: `Route ${parentId}-${i}`, isPage: true, children: [] } as RoutePartDetailsDTO;
                    }
                ));
            }, 700);
        })
    }
}
