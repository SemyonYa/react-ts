import React from "react";
import { RoutePart } from "./RoutePart";
import { RoutePartDTO } from "./RoutePartDTO";

interface IRouteEditorProps {
    parts: RoutePartDTO[]
}

export class RouteEditor extends React.PureComponent<IRouteEditorProps> {

    render() {
        return (
            React.createElement('div', {style: {display: 'flex'}},
                ...React.Children.toArray(this.props.parts.map(part =>
                        [
                            React.createElement(RoutePart, { part }),
                            React.createElement('span', { style: {margin: '0 .5rem'} }, '/')
                        ]
                    )
                )
            )
        );
    }
}

