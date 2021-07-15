import React from "react";
import * as axios from 'axios';
import { RoutePartDetailsDTO } from "./RoutePartDetailsDTO";
import { FetchStatus } from "./RouteViewer";

interface IItemProps {
    route: RoutePartDetailsDTO;
    baseUrl: string;
}

interface IItemState {
    status: FetchStatus;
}

export class Item extends React.PureComponent<IItemProps, IItemState> {

    constructor(props: IItemProps) {
        super(props);
        this.state = {
            status: FetchStatus.Fetched
        }
    }

    // shouldComponentUpdate(nextProps: IItemProps, nextState: IItemState, nextContext: any) {
    //     return true;
    // }

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
                // React.createElement('div', { onClick: !this.props.route.isPage ? this.fetchCHildren : this.goToPage }, this.props.route.name),
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


    /// FAKE
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