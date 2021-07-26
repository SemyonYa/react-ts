import React from 'react';
import { APPLICATION_CONTEXT, IApplicationContext } from '../context/IApplicationContext';
import { ISectionProps } from '../models/ISectionProps';
import { RoutePartDetailsDTO } from '../models/RoutePartDetailsDTO';
import { RouteStore } from '../store/RouteStore';
import { Pagination } from './Pagination';

const store = new RouteStore();

interface IRouterViewState {
    searchValue: string;
    pageSize: number;
    pageNumber: number;
    totalRowCount: number;
    routes: RoutePartDetailsDTO[],
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
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        store.get(this.state.pageNumber, this.state.pageSize, this.state.searchValue)
            .then(
                response => {
                    this.setState({ routes: response.Data, totalRowCount: +response.TotalRowCount });
                    context.hideLoadingScreen();
                }
            ).catch(context.contextController.setError);
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
                        : React.createElement('span', {}, 'empty list')
                ),
                React.createElement('a', { href: '/Admin/PageEditor' }, 'Новая страница'),
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

RouteViewer.contextType = APPLICATION_CONTEXT;

///
/// ITEM
///

interface IItemProps {
    route: RoutePartDetailsDTO;
}

class Item extends React.PureComponent<IItemProps> {

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', {},
                    this.props.route.isPage
                        ? React.createElement('a', { href: `#${this.props.route.id}`, onClick: this.goToPage }, this.props.route.name)
                        : React.createElement('span', { onClick: this.fetchChildren }, this.props.route.name)
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', paddingLeft: '2rem' } },
                    this.props.route.children && this.props.route.children.length > 0
                        ? React.Children.toArray(this.props.route.children.map(route =>
                            React.createElement(Item, { route })
                        ))
                        : null
                ),
            )
        );
    }

    private fetchChildren = () => {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        store.getChildren(this.props.route.id)
            .then(
                children => {
                    this.props.route.children = children;
                    context.hideLoadingScreen();
                    this.forceUpdate();
                }
            )
            .catch(context.contextController.setError);
    }

    private goToPage = () => {
        alert('go to page ' + this.props.route.id);
    }
}

Item.contextType = APPLICATION_CONTEXT;
