import React from "react";
import { RoutePartDTO } from "./RoutePartDTO";

interface IRoutePartProps {
    part: RoutePartDTO
}

interface IRoutePartState {
    isEditor: boolean
}

export class RoutePart extends React.PureComponent<IRoutePartProps, IRoutePartState> {

    constructor(props: IRoutePartProps) {
        super(props);
        this.state = {
            isEditor: false
        }
    }

    render() {
        return (
            React.createElement('div', { onClick: () => { this.setState({ isEditor: !this.state.isEditor }) } },
                this.state.isEditor ?
                    React.createElement('div', {},
                        'edit'
                    )
                    :
                    React.createElement('span', {},
                        'read'
                    )
            )
        );
    }

}