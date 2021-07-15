import React from "react";
import { RoutePartDetailsDTO } from "./RoutePartDetailsDTO";
import { FetchStatus } from "./RouteViewer";

interface IItemProps {
    route: RoutePartDetailsDTO
}

interface IItemState {
    status: FetchStatus;
}

export class Item extends React.PureComponent<IItemProps, IItemState> {

    constructor(props: IItemProps) {
        super(props);
        this.state = {
            status: FetchStatus.Initial
        }
    }

    render() {
        let component: React.ReactNode;
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
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', { onClick: this.fetchCHildren }, this.props.route.name),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', paddingLeft: '2rem' } }, component),
            )
        );
    }

    fetchCHildren = () => {
        this.setState({ status: FetchStatus.InProgress });
        // TODO: /api/Configuration/Routes/{elementId}
        this._children(this.props.route.id).then(
            children => {
                this.props.route.children = children;
                this.setState({ status: FetchStatus.Fetched });
                this.forceUpdate();
            },
            reason => {
                this.setState({ status: FetchStatus.Failed });
            }
        )
    }


    /// FAKE
    private _children(parentId: string): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3].map(
                    i => {
                        return { id: `${parentId}-${i}`, name: `Route ${parentId}-${i}`, isPage: false, children: [] } as RoutePartDetailsDTO;
                    }
                ));
            }, 2000);
        })
    }
}