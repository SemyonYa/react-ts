import React from "react";
import { MenuItemDTO } from "./MenuItemDTO";

interface IMenuProps {
    items: MenuItemDTO[];
    isShown: boolean;
    hide(): void
}

interface IMenuState {
    status: FetchStatus
}

enum FetchStatus {
    Initial,
    InProgpress,
    Fetched,
    Failed
}

export class Menu extends React.PureComponent<IMenuProps, IMenuState> {
    render() {
        return (
            React.createElement('div', { style: this.menuStyle },
                ...React.Children.toArray(this.props.items.map((item) =>
                    React.createElement('div', { onClick: this.props.hide }, `${item.pageId} - ${item.text}`)
                ))
            )
        );
    }

    get menuStyle() {
        return {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            width: '40vw',
            transition: '1s',
            backgroundColor: 'rgba(255,255,255,.85)',
            border: 'solid 1px green',
            transform: this.props.isShown ? 'translateX(0)' : 'translateX(-100%)'
        };
    }
}