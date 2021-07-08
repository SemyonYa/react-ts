import React from "react";
import { RouteParameterDTO } from "./RouteParameterDTO";
import { RoutePart } from "./RoutePart";
import { RoutePartDTO } from "./RoutePartDTO";

interface IRouteEditorProps {
    parts: RoutePartDTO[]
}

export class RouteEditor extends React.PureComponent<IRouteEditorProps> {

    render() {
        return (
            React.createElement('div', {},
                ...this.props.parts.map(part =>
                    React.createElement(RoutePart, { part })
                )
            )
        );
    }
}

