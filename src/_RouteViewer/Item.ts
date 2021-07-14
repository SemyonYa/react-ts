import React from "react";
import { RoutePartDetailsDTO } from "./RoutePartDetailsDTO";

interface IItemProps {
    route: RoutePartDetailsDTO
}

interface IItemState {
    expanded: boolean;
}

export class Item extends React.PureComponent<IItemProps, IItemState> {

    constructor(props: IItemProps) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', {}, this.props.route.name),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', paddingLeft: '2rem' } },
                    this.props.route.children && this.props.route.children.length > 0
                        ? React.Children.toArray(this.props.route.children.map(route =>

                            React.createElement('div', {}, route.name)
                        ))
                        : null
                ),
            )
        );
    }
}