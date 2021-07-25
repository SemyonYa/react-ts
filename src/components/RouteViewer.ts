import React from 'react';
import { ISectionProps } from '../models/ISectionProps';
import { RoutePartDetailsDTO } from '../models/RoutePartDetailsDTO';
import { RouteStore } from '../store/RouteStore';

const store = new RouteStore();

export enum FetchStatus {
    InProgress,
    Fetched,
    Failed
}

interface IRouterViewState {
    searchValue: string;
    pageSize: number;
    pageNumber: number;
    totalRowCount: number;
    routes: RoutePartDetailsDTO[],
    status: FetchStatus
}

export class RouteViewer extends React.PureComponent<ISectionProps, IRouterViewState> {
    currentTimeout: any;

    constructor(props: ISectionProps) {
        super(props);
        this.state = {
            searchValue: '',
            pageSize: 10,
            pageNumber: 1,
            totalRowCount: null,
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

        this.currentTimeout = setTimeout(() => {
            this.setState({ pageNumber: 1 });
            this.fetch();
        }, 500);
    }

    private onPageSizeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const currentValue: number = +e.currentTarget.value;
            this.setState({ pageSize: currentValue, pageNumber: 1 });
            this.fetch();
        }
    }

    private fetch = () => {
        this.setState({ status: FetchStatus.InProgress });
        store.get(this.state.pageNumber, this.state.pageSize, this.state.searchValue)
            .then(
                response => {
                    this.setState({ routes: response.Data, status: FetchStatus.Fetched, totalRowCount: +response.TotalRowCount })
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
                this.state.totalRowCount
                    ? React.createElement(Pagination, {
                        onChange: this.changePage,
                        pageQty: Math.ceil(this.state.totalRowCount / this.state.pageSize),
                        pageNumber: this.state.pageNumber
                    })
                    : null
            )
        );
    }
}


///
/// TODO: to separated component
/// PAGINATION
///

interface IPaginationProps {
    pageQty: number;
    pageNumber: number;
    onChange(page: number): void;
}

class Pagination extends React.PureComponent<IPaginationProps> {

    private onChange = (page: number) => {
        if (this.props.pageNumber !== page) {
            this.props.onChange(page);
        }
    }

    render() {
        let pages: number[] = Array(this.props.pageQty).fill(0).map((_, i) => i + 1);
        return (
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                ...React.Children.toArray(pages.map(page =>
                    React.createElement(
                        'span',
                        {
                            onClick: () => this.onChange(page),
                            style: { fontWeight: page === this.props.pageNumber ? '800' : '400', cursor: 'pointer' }
                        },
                        page
                    )
                ))
            )
        );
    }
}

///
/// ITEM
///

interface IItemProps {
    route: RoutePartDetailsDTO;
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
                        React.createElement(Item, { route })
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
                        ? React.createElement('a', { href: `#${this.props.route.id}`, onClick: this.goToPage }, this.props.route.name)
                        : React.createElement('span', { onClick: this.fetchChildren }, this.props.route.name)
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', paddingLeft: '2rem' } }, component),
            )
        );
    }

    private fetchChildren = () => {
        this.setState({ status: FetchStatus.InProgress });
        store.getChildren(this.props.route.id)
            .then(
                children => {
                    this.props.route.children = children;
                    this.setState({ status: FetchStatus.Fetched });
                    this.forceUpdate();
                },
                reason => {
                    this.setState({ status: FetchStatus.Failed });
                }
            );
    }

    private goToPage = () => {
        alert('go to page ' + this.props.route.id);
    }

}
