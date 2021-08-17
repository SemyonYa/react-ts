import * as React from 'react';
import { APPLICATION_CONTEXT, IApplicationContext } from '../../context/IApplicationContext';
import { DisplayedMenuItemDTO } from '../../models/DisplayedMenuItemDTO';
import { ILayoutComponentProps } from './ILayoutComponentProps';
import { NavigationMenu } from './NavigationMenu';
// import { APPLICATION_CONTEXT, IApplicationContext } from '../../Platform/Core/Models/IApplicationContext';
// import { DisplayedMenuItemDTO } from '../../Platform/Core/Models/DTO/DisplayedMenuItemDTO';
// import { ILayoutComponentProps } from '../../Platform/Core/Models/Page/ILayoutComponentProps';
// import { NavigationMenu } from '../../Platform/Core/Components/NavigationMenu';


interface ILayoutState {
    menuItems: DisplayedMenuItemDTO[];
}

class Layout extends React.Component<ILayoutComponentProps, ILayoutState> {
    logo = './platform/layouts/ex/images/logo.svg';
    homeIcon = './platform/layouts/ex/images/home.svg';
    homeActiveIcon = './platform/layouts/ex/images/home-active.svg';
    fake = './platform/layouts/ex/images/fake.svg';
    fakeActive = './platform/layouts/ex/images/fake-active.svg';
    resize = './platform/layouts/ex/images/resize.svg';
    lupe = './platform/layouts/ex/images/lupe.svg';

    constructor(props: ILayoutComponentProps) {
        super(props);
        this.state = {
            menuItems: []
        }
    }

    componentDidMount() {
        const context = this.context as IApplicationContext;
        // TODO: ??
        this.props.menuStore.getChildren(this.props.pageId)
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
                        React.createElement('img', { src: this.logo, alt: 'eurochem' })
                    ),
                    // TODO: 
                    React.createElement(MenuItem, { name: 'Home', iconSrc: 0 === this.props.pageId ? this.homeActiveIcon : this.homeIcon, isActive: 0 === this.props.pageId }),

                    React.createElement('div', { className: 'nav--menu' },
                        React.createElement('div', { className: 'nav--menu-title' },
                            React.createElement('span', {}, 'Menu'),
                            React.createElement('img', { src: this.lupe }),
                            React.createElement('img', { src: this.resize })
                        ),
                        React.createElement(NavigationMenu, { menuId: this.props.menuIds[0], menuItemsStore: this.props.menuStore, currentPageId: this.props.pageId }),
                    ),

                    React.Children.map(this.props.children, (child, index) => { return index == 2 ? child : null; }),
                    React.Children.map(this.props.children, (child, index) => { return index == 3 ? child : null; }),
                ),
                React.createElement('div', { className: 'body' },
                    React.createElement('section', { className: 'header' },
                        React.createElement('div', { className: 'header--title' }, 'EUROCHEM OPTIMIZER'),
                        React.createElement('div', { className: 'header--subtitle' },
                            React.Children.map(this.props.children, (child, index) => { return index == 1 ? child : null; })),
                    ),
                    React.Children.map(this.props.children, (child, index) => { return index == 0 ? child : null; })
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

/// 
/// EXPORT
/// 
export const LayoutFC: React.FunctionComponent<ILayoutComponentProps> = (props) => {
    //let context = React.useContext(VIEW_MODEL_CONTEXT);
    //let labelText = context.getExpression(props.settings['label']);

    return React.createElement(Layout, { ...props });
}

export const ExLayoutDescription = { layout: LayoutFC, cssUrl: './platform/layouts/ex/css/commonstyles.css', positionsCount: 3 };