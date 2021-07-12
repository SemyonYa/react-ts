import * as React from 'react';
import { ILayoutProps } from './ILayoutProps';
import { Menu } from './Menu';
import img from './menu.svg';
import { MenuItemDTO } from './MenuItemDTO';

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
                    React.createElement('span', {}, 'AppBar'),
                ),
                React.createElement('div', { onClick: this.hideMenu, style: this.styles.body },
                    'Page with ID ' + this.props.pageId
                ),
                React.createElement(
                    Menu,
                    {
                        items: [
                            { pageId: 1, text: 'first' } as MenuItemDTO,
                            { pageId: 2, text: 'second' } as MenuItemDTO,
                            { pageId: 3, text: 'third' } as MenuItemDTO,
                        ],
                        isShown: this.state.menuShown,
                        hide: this.hideMenu
                    }
                )
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
                top: '2px',
                left: '2px',
                right: '2px',
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                padding: '.75rem',
                border: 'solid 1px orange',
            },
            headerImg: {
                width: '2rem',
                height: '2rem',
                padding: '.25rem',
                marginRight: '2rem',
            },
            body: {
                minHeight: '100vh',
                border: 'solid 2px darkred',
                padding: '4.5rem'
            }
        };
    }
}