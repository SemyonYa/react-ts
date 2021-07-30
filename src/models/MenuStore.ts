import * as axios from 'axios';
import { MenuItemDTO } from './MenuItemDTO2';

const Axios = axios.default;

export class MenuStore {
    private menuApiUrl: string;

    constructor(menuApiUrl: string) {
        this.menuApiUrl = menuApiUrl;
    }

    private _items(pageId?: any): Promise<MenuItemDTO[]> {
        return new Promise<MenuItemDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        { id: 1, name: 'first', } as MenuItemDTO,
                        { id: 2, name: 'second', } as MenuItemDTO,
                        { id: 3, name: 'third' } as MenuItemDTO,
                    ]
                );
            }, 2000);
        });

    }
    getCurrentUser(pageId: any): Promise<MenuItemDTO[]> {
        return this._items();
        return new Promise<MenuItemDTO[]>((resolve, reject) => {
            Axios.get<MenuItemDTO[]>(this.menuApiUrl + '/' + pageId).then((response) => {
                resolve(response.data);
            }).catch((reason) => { reject(reason); });
        });
    }
}