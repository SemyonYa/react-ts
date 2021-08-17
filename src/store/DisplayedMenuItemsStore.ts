import * as axios from 'axios';
import { DisplayedMenuItemDTO } from '../models/DisplayedMenuItemDTO';

const Axios = axios.default;

export class DisplayedMenuItemsStore {
    private menuApiUrl: string;

    constructor(menuApiUrl: string) {
        this.menuApiUrl = menuApiUrl;
    }

    getPageMenu(menuId: any, pageId: any): Promise<DisplayedMenuItemDTO[]> {
        return new Promise<DisplayedMenuItemDTO[]>((resolve, reject) => {
            Axios.get<DisplayedMenuItemDTO[]>(this.menuApiUrl + '/' + menuId + '/page/' + pageId).then((response) => {
                resolve(response.data);
            }).catch((reason) => { reject(reason); });
        });
    }

    getChildren(menuItemId: any): Promise<DisplayedMenuItemDTO[]> {
        return new Promise<DisplayedMenuItemDTO[]>((resolve, reject) => {
            Axios.get<DisplayedMenuItemDTO[]>(this.menuApiUrl + '/' + menuItemId + '/children').then((response) => {
                resolve(response.data);
            }).catch((reason) => { reject(reason); });
        });
    }
}