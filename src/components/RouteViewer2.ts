import React from 'react';
import { APPLICATION_CONTEXT, IApplicationContext } from '../context/IApplicationContext';
import { RoutePartDetailsDTO } from '../models/RoutePartDetailsDTO';
import { RouteStore } from '../store/RouteStore';
import { Pagination } from './Pagination';

interface IRouteViewerProps {
    sectionComponentConfiguration: any
}

interface IRouteViewerState {
    searchValue: string;
    pageSize: number;
    pageNumber: number;
    totalRowCount: number;
    routes: RoutePartDetailsDTO[],
}

export class RouteViewer2 extends React.Component<IRouteViewerProps, IRouteViewerState> {
    currentTimeout: any;
    constructor(props: IRouteViewerProps) {
        super(props);
        this.state = {
            searchValue: '',
            pageSize: 10,
            pageNumber: 1,
            totalRowCount: 0,
            routes: []
        }
    }

    private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue: string = e.target.value;
        this.setState({ searchValue: currentValue });

        if (this.currentTimeout) clearTimeout(this.currentTimeout);

        this.currentTimeout = setTimeout(() => {
            this.setState({ pageNumber: 1 });
        }, 500);
    }

    private onPageSizeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const currentValue: number = +e.currentTarget.value;
            this.setState({ pageSize: currentValue, pageNumber: 1 });
            // this.fetch();
        }
    }

    private changePage = (page: number) => {
        this.setState({ pageNumber: page });
        // this.fetch();
    }

    private setTotalRowCount = (totalRowCount: number) => {
        this.setState({ totalRowCount });
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } },
                React.createElement('input', { onChange: this.onSearchChange, value: this.state.searchValue, placeholder: 'Найти' }),
                React.createElement(List, {
                    baseUrl: this.props.sectionComponentConfiguration['baseUrl'],
                    pageNumber: this.state.pageNumber,
                    pageSize: this.state.pageSize,
                    searchValue: this.state.searchValue,
                    onResponse: this.setTotalRowCount
                }),
                React.createElement('a', { href: '/Admin/PageEditor' }, 'Новая страница'),
                React.createElement('input', { defaultValue: this.state.pageSize, onKeyDown: this.onPageSizeSubmit, placeholder: 'page size', type: 'number' }),
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
/// LIST
///

interface IListProps {
    parentId?: string;
    pageNumber?: number;
    pageSize?: number;
    baseUrl: string;
    searchValue?: string;
    onResponse?(totalRowCount: number): void;
}

interface IListState {
    items: RoutePartDetailsDTO[];
    expanded: boolean;
}

class List extends React.Component<IListProps, IListState> {
    store: RouteStore;
    constructor(props: IListProps) {
        super(props);
        this.store = new RouteStore(props.baseUrl);
        this.state = {
            items: [],
            expanded: false
        }
    }



    componentDidMount() {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        if (!this.props.parentId) {
            this.store.get(this.props.pageNumber, this.props.pageSize, this.props.searchValue)
                .then(response => {
                    this.setState({ expanded: true, items: response.Data });
                    this.props.onResponse(response.TotalRowCount);
                })
                .catch(context.contextController.setError)
        } else {
            this.store.getChildren(this.props.parentId)
                .then(response => {
                    this.setState({ expanded: true, items: response })
                })
                .catch(context.contextController.setError)
        }
    }

    render() {
        return (
            this.state.expanded
                ? this.state.items.length > 0
                    ? React.Children.toArray(this.state.items.map(item =>
                        React.createElement(Item, { item, baseUrl: this.props.baseUrl })
                    ))
                    : React.createElement('div', {}, 'Список пуст')
                : null
        );
    }
}

List.contextType = APPLICATION_CONTEXT;

///
/// ITEM
///

interface IItemProps {
    item: RoutePartDetailsDTO;
    baseUrl: string;
}

interface IItemState {
    childrenShown: boolean;
}

class Item extends React.Component<IItemProps, IItemState> {

    constructor(props: IItemProps) {
        super(props);
        this.state = {
            childrenShown: false,
        }
    }

    private showChildren = (e) => {
        console.log(e);

        e.preventDefault();
        if (!this.state.childrenShown) {
            this.setState({ childrenShown: true });
        }
    }

    render() {
        return (
            React.createElement('ul', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('li', {},
                    React.createElement('a', { href: '', onClick: this.showChildren }, this.props.item.name),
                    this.state.childrenShown
                        ? React.createElement(List, { parentId: this.props.item.id, baseUrl: this.props.baseUrl })
                        : null
                ))
        );
    }
}