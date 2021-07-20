import React from "react";
import * as axios from 'axios';
import { MenuItemDTO } from "./MenuItemDTO";
import { FetchStatus } from "./MainMenu";

interface IMainMenuItemProps {
    model: MenuItemDTO;
    baseUrl: string;
}

interface IMainMenuItemState {
    status: FetchStatus;
    children: MenuItemDTO[];
}

export class MainMenuItem extends React.PureComponent<IMainMenuItemProps, IMainMenuItemState> {

    constructor(props: IMainMenuItemProps) {
        super(props);
        this.state = {
            children: null,
            status: FetchStatus.Fetched
        };

    }

    private onClick = () => {
        if (this.props.model.internalPageId || this.props.model.externalUrl) {
            let location = this.props.model.internalPageId ? this.props.baseUrl + '/go/to/page/' + this.props.model.internalPageId : this.props.model.externalUrl;
            if (this.props.model.parametersObjectJson) {
                location += '?';
                const paramsObj = JSON.parse(this.props.model.parametersObjectJson)
                for (let item in paramsObj as Map<string, any>) {
                    location += `${item}=${paramsObj[item]}&`;
                }
            }
            console.log(location);
            window.location.href = location;
        } else {
            this.fetchChildren(this.props.model.id);
        }
    }

    render() {
        let component: React.ReactNode;
        switch (this.state.status) {
            case FetchStatus.Fetched:
                if (this.state.children) {
                    component = this.state.children.length > 0
                        ? React.Children.toArray(this.state.children.map(model =>
                            React.createElement(MainMenuItem, { model, baseUrl: this.props.baseUrl }),
                        ))
                        : React.createElement('span', {}, 'empty list');
                } else {
                    component = null
                }
                break;
            case FetchStatus.InProgress:
                component = React.createElement('span', {}, 'in progress');
                break;
            case FetchStatus.Failed:
                component = React.createElement('span', {}, 'failed');
                break;
            default:
                break;
        }
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                React.createElement('div', { onClick: this.onClick }, this.props.model.name),
                React.createElement('div', { style: { paddingLeft: '2rem' } }, component),
            )
        );
    }

    private fetchChildren = (parentId: string) => {
        this.setState({ status: FetchStatus.InProgress });
        // TODO: 
        // axios.default.get(this.props.baseUrl + '/api/Configuration/Menu/' + parentId)
        this._children(parentId)
            .then(
                children => this.setState({ children: children.sort((ch1, ch2) => ch1.orderIndex - ch2.orderIndex), status: FetchStatus.Fetched }),
                reason => this.setState({ status: FetchStatus.Failed })
            );
    }

    // TODO: delete
    private _children = (parentId: string): Promise<MenuItemDTO[]> => {
        return new Promise<MenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log(parentId);

                    resolve([1, 2, 3].map(i => {
                        return {
                            id: `${parentId}-${i}`,
                            name: `Item ${parentId}-${i}`,
                            orderIndex: i,
                            internalPageId: parentId.length >= 3 ? `${parentId}-${i}` : null
                        } as MenuItemDTO;
                    }));
                }, 1000);
            }
        )
    }
}