import * as React from 'react';
import { ILayoutProps } from './ILayoutProps';
import { Menu } from './Menu';
import img from './menu.svg';

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
                    React.createElement('span', {}, 'Page #' + this.props.pageId),
                ),
                React.createElement('div', { style: this.styles.body },
                    this.props.children
                ),
                this.state.menuShown ? React.createElement(
                    'div', { onClick: this.hideMenu, style: this.styles.menuBack }
                ) : null,
                this.state.menuShown ?
                    React.createElement(Menu, { menuStore: this.props.menuStore, hide: this.hideMenu }
                    ) : null
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