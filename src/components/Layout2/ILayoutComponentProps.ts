import { DisplayedMenuItemsStore } from "../../store/DisplayedMenuItemsStore";

export interface ILayoutComponentProps {
    pageId: any;
    menuIds: any[];
    menuStore: DisplayedMenuItemsStore;
}