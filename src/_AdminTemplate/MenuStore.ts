import * as axios from 'axios';
import { MenuItemDTO } from './MenuItemDTO';

const Axios = axios.default;

export class MenuStore {
    private menuApiUrl: string;

    constructor(menuApiUrl: string) {
        this.menuApiUrl = menuApiUrl;
    }

    getCurrentUser(pageId: any): Promise<MenuItemDTO[]> {
        return new Promise<MenuItemDTO[]>((resolve, reject) => {
            Axios.get<MenuItemDTO[]>(this.menuApiUrl + '/' + pageId).then((response) => {
                resolve(response.data);
            }).catch((reason) => { reject(reason); });
        });
    }
}