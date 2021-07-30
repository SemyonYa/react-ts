import React from 'react';

import { ILayoutProps } from '../models/ILayoutProps';
import { MainMenu } from './MainMenu';
import { APPLICATION_CONTEXT, IApplicationContext } from '../context/IApplicationContext';
import { MenuItemDTO } from '../models/MenuItemDTO2';

// svg
import logo from '../assets/logo.svg';
import homeIcon from '../assets/icons/home.svg';
import homeActiveIcon from '../assets/icons/home-active.svg';

import fake from '../assets/fake.svg';
import fakeActive from '../assets/fake-active.svg';

interface ILayoutState {
    menuItems: MenuItemDTO[];
}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);
        this.state = {
            menuItems: []
        }
    }

    componentDidMount() {
        // TODO: fetch
        const context = this.context as IApplicationContext;
        this.props.menuStore.getCurrentUser(this.props.pageId)
            .then(menuItems => {
                this.setState({ menuItems })
            })
            .catch(context.contextController.setError);
    }

    render() {
        return (
            React.createElement('div', {},
                React.createElement('nav', {},
                    React.createElement('div', { className: 'nav--logo' },
                        React.createElement('img', { src: logo, alt: 'eurochem' })
                    ),
                    // TODO: 
                    React.createElement(MenuItem, { name: 'Home', iconSrc: 0 === this.props.pageId ? homeActiveIcon : homeIcon, isActive: 0 === this.props.pageId }),
                    React.createElement('div', { className: 'nav--menu' },
                        React.createElement('div', { className: 'nav--menu-title' },
                            React.createElement('span', {}, 'Menu'),
                            React.createElement('img', { src: fakeActive }),
                            React.createElement('img', { src: fakeActive })
                        ),
                        React.Children.toArray(this.state.menuItems.map(i =>
                            React.createElement(MenuItem, { name: i.name, iconSrc: i.id === this.props.pageId ? fakeActive : fake, isActive: i.id === this.props.pageId })
                        )),
                    ),
                    React.createElement('div', { className: 'nav--menu fast-access' },
                        React.createElement('div', { className: 'nav--menu-title' },
                            React.createElement('span', {}, 'Fast access'),
                            React.createElement('img', { src: fakeActive }),
                            React.createElement('img', { src: fakeActive }),
                            React.createElement('img', { src: fakeActive })
                        ),
                        React.Children.toArray(this.state.menuItems.map(i =>
                            React.createElement(MenuItem, { name: i.name, iconSrc: i.id === this.props.pageId ? fakeActive : fake, isActive: i.id === this.props.pageId })
                        )),
                    ),
                    React.createElement('div', { className: 'nav--menu' },
                        React.createElement('div', { className: 'nav--menu-title' },
                            React.createElement('span', {}, 'Language'),
                            React.createElement('img', { src: fakeActive })
                        ),
                        React.createElement(MenuItem, { name: 'English', iconSrc: fake, isActive: false })
                    ),
                ),
                React.createElement('div', { className: 'body' },
                    React.createElement('section', { className: 'header' },
                        React.createElement('div', { className: 'header--title' }, 'EUROCHEM OPTIMIZER'),
                        React.createElement('div', { className: 'header--subtitle' },
                            'Welcome, ',
                            React.createElement('span', {}, 'User Name')
                        ),
                    ),
                    this.props.children
                )
            )
        );
    }
}

Layout.contextType = APPLICATION_CONTEXT;

///
/// MenuItem
///

interface IMenuItemProps {
    name: string;
    iconSrc: string;
    isActive: boolean;
}

class MenuItem extends React.Component<IMenuItemProps> {
    render() {
        return (
            React.createElement('div', { className: `nav--menu-item ${this.props.isActive ? 'active' : ''}` },
                React.createElement('img', { src: this.props.iconSrc }),
                this.props.name
            )
        );
    }
}