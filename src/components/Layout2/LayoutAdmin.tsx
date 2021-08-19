import React from "react";
import logo from '../../assets/logo.svg';
import { APPLICATION_CONTEXT, IApplicationContext } from '../../context/IApplicationContext';
import { TreeView, TreeViewExpandChangeEvent, TreeViewItemClickEvent } from "@progress/kendo-react-treeview";
import { AsideFastAccess } from "./AsideFastAccess";
import { ILayoutAdminComponentProps } from "./ILayoutAdminComponentProps";
import { EditedMenuItemDTO } from "../../models/EditedMenuItemDTO";
import { AsideLanguage } from "./AsideLanguage";

interface TreeItem {
    id: any;
    text: string;
    expanded: boolean;
    items: TreeItem[];
}

interface ILayoutAdminState {
    treeItems: TreeItem[];
}

export class LayoutAdmin extends React.Component<ILayoutAdminComponentProps, ILayoutAdminState> {
    logo = '../../assets/logo.svg';
    resize = '../../assets/resize.svg';
    lupe = '../../assets/lupe.svg';

    constructor(props: ILayoutAdminComponentProps) {
        super(props);
        this.state = {
            treeItems: []
        }
    }

    componentDidMount() {
        const context = this.context as IApplicationContext;
        this.props.menuStore.getPageMenu(this.props.menuIds, this.props.pageId)
            .then(menuItems => {
                console.log("🚀 ~ file: LayoutAdmin.tsx ~ line 36 ~ LayoutAdmin ~ componentDidMount ~ menuItems", menuItems)
                const treeItems = this.buildTreeFromData(menuItems);
                this.setState({ treeItems })
            })
            .catch(context.contextController.setError);
    }

    private buildTreeFromData = (items: EditedMenuItemDTO[]): TreeItem[] => {
        const treeItems: TreeItem[] = [];
        for (let index = 0; index < items.length; index++) {
            const treeItem = {
                id: items[index].id,
                text: items[index].name,
                expanded: false,
            } as TreeItem;
            if (items[index].children?.length > 0) {
                treeItem.items = this.buildTreeFromData(items[index].children);
            }
            treeItems.push(treeItem);
        }
        return treeItems;
    }

    private onExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    };

    private onItemClick = (event: TreeViewItemClickEvent) => {
        event.item.selected = !event.item.selected;
    };

    render() {
        return (
            <div>
                <nav>
                    <div className='nav--logo'>
                        <img src={logo} alt="eurochem" />
                        <hr />
                        <TreeView
                            data={this.state.treeItems}
                            expandIcons={true}
                            onExpandChange={this.onExpandChange}
                            aria-multiselectable={true}
                            onItemClick={this.onItemClick}
                        />
                        <hr />
                        <AsideFastAccess
                            setNotification={(msg: string) => { console.log(msg); }}
                        />
                        <hr />
                        <AsideLanguage />
                        <hr />
                    </div>
                </nav>
                <div className='body'>

                </div>
            </div>
        );
    }
}

LayoutAdmin.contextType = APPLICATION_CONTEXT;

/// 
/// EXPORT
/// 
export const LayoutAdminFC: React.FunctionComponent<ILayoutAdminComponentProps> = (props) => {
    return React.createElement(LayoutAdmin, { ...props });
}

export const ExLayoutDescription = { layout: LayoutAdminFC, cssUrl: './platform/layouts/ex/css/commonstyles.css', positionsCount: 3 };

