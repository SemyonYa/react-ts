import * as React from 'react';
import { ILayoutProps } from './ILayoutProps';
import img from './menu.svg';
import { MenuItemDTO } from './MenuItemDTO';

///
/// TEMPLATE
///

interface IAdminTemplateState {
    menuShown: boolean;
}

export class AdminTemplate extends React.PureComponent<ILayoutProps, IAdminTemplateState> {

    constructor(props: ILayoutProps) {
        super(props);
        this.state = {
            menuShown: false
        }
    }

    render() {
        return (
            React.createElement('div', { style: this.styles.root },
                React.createElement('div', { style: this.styles.header },
                    React.createElement('img', { src: img, onClick: this.showMenu, style: this.styles.headerImg }),
                    React.createElement('span', {}, this.props.pageId),
                ),
                React.createElement('div', {},
                    this.props.children
                ),
                this.state.menuShown ?
                    React.createElement('div', { onClick: this.hideMenu, style: this.styles.menuBack })
                    : null,
                this.state.menuShown ?
                    React.createElement(Menu, { layoutProps: this.props, hide: this.hideMenu })
                    : null
            )
        );
    }

    showMenu = () => {
        this.setState({ menuShown: true });
    }

    hideMenu = () => {
        this.setState({ menuShown: false });
    }

    get styles(): any {
        return {
            root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch'
            },
            header: {
                position: 'fixed',
                top: '0px',
                left: '0px',
                right: '0px',
            },
            headerImg: {
                width: '2rem',
                height: '2rem',
            },
            menuBack: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }
        };
    }
}

///
/// MENU
///

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
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    buildItemsAsTtee(items: MenuItemDTO[], level: number = 0) {
        for (let item of items) {
            this.itemsAsTree.push({ menuItem: item, level: level });
            if (item.children && item.children.length > 0) {
                this.buildItemsAsTtee(item.children, level + 1);
            }
        }

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
        return React.createElement('div', { style: { position: 'fixed', top: 0, bottom: 0, left: 0 } }, stateComponent);
    }

}