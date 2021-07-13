import React from "react";
import { ILayoutProps } from "./ILayoutProps";
import { MenuItemDTO } from "./MenuItemDTO";

interface IMenuProps {
    layoutProps: ILayoutProps;
    hide(): void
}

interface IMenuState {
    status: FetchStatus
}

enum FetchStatus {
    InProgress,
    Fetched,
    Failed
}

export class Menu extends React.Component<IMenuProps, IMenuState> {

    private mounted: boolean;
    private itemsAsTree: { menuItem: MenuItemDTO, level: number }[] = [];

    constructor(props: IMenuProps) {
        super(props);
        this.state = { status: null }
    }

    componentDidMount() {
        this.fetchMenuItems();
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let stateComponent;
        switch (this.state.status) {
            case FetchStatus.InProgress:
                stateComponent = 'inProgress';
                break;
            case FetchStatus.Fetched:
                stateComponent = React.createElement('div', {},
                    ...React.Children.toArray(this.itemsAsTree.map((i) =>
                        React.createElement('div', { onClick: this.props.hide, style: { marginLeft: `${i.level}rem` } }, `${i.menuItem.text} (level ${i.level})`)
                    ))
                )
                break;
            case FetchStatus.Failed:
                stateComponent = 'failed';
                break;
            default:
                stateComponent = null
                break;
        }
        return (
            React.createElement('div', { style: this.menuStyle },
                stateComponent
            )
        );
    }

    fetchMenuItems = () => {
        this.setState({ status: FetchStatus.InProgress });
        // TODO: replace method
        this.props.layoutProps.menuStore._items(this.props.layoutProps.pageId)
            .then(
                (items) => {
                    this.buildItemsAsTtee(items)
                    if (this.mounted)
                        this.setState({ status: FetchStatus.Fetched })

                },
                (reason) => {
                    console.log(reason);
                    if (this.mounted)
                        this.setState({ status: FetchStatus.Failed })
                }
            );
    }

    buildItemsAsTtee(items: MenuItemDTO[], level: number = 0) {
        for (let item of items) {
            this.itemsAsTree.push({ menuItem: item, level: level });
            if (item.children && item.children.length > 0) {
                this.buildItemsAsTtee(item.children, level + 1);
            }
        }

    }

    get menuStyle() {
        return {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
        };
    }
}