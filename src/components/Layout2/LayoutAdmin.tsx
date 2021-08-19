import React from "react";
import logo from '../../assets/logo.svg';
import { APPLICATION_CONTEXT, IApplicationContext } from '../../context/IApplicationContext';
import { ILayoutComponentProps } from './ILayoutComponentProps';
import { TreeView, TreeViewExpandChangeEvent, TreeViewItemClickEvent } from "@progress/kendo-react-treeview";

export class LayoutAdmin extends React.Component<ILayoutComponentProps> {
    logo = '../../assets/logo.svg';
    resize = '../../assets/resize.svg';
    lupe = '../../assets/lupe.svg';

    private tree = [{
        text: 'Furniture',
        expanded: true,
        items: [{
            text: 'Tables & Chairs'
        }, {
            text: 'Sofas'
        }, {
            text: 'Occasional Furniture'
        }]
    }, {
        text: 'Decor',
        items: [{
            text: 'Bed Linen'
        }, {
            text: 'Curtains & Blinds'
        }, {
            text: 'Carpets'
        }]
    }];

    private onExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    };

    private onItemClick = (event: TreeViewItemClickEvent) => {
        event.item.selected = !event.item.selected;
    };

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
            <div>
                <nav>
                    <div className='nav--logo'>
                        <img src={logo} alt="eurochem" />
                        <TreeView
                            data={this.tree}
                            expandIcons={true}
                            onExpandChange={this.onExpandChange}
                            aria-multiselectable={true}
                            onItemClick={this.onItemClick}
                        />
                    </div>
                </nav>
                <div className='body'></div>
            </div>
        );
    }
}

LayoutAdmin.contextType = APPLICATION_CONTEXT;