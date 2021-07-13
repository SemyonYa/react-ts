import * as axios from 'axios';
import { MenuItemDTO } from './MenuItemDTO';

const Axios = axios.default;

export class MenuStore {
    private menuApiUrl: string;

    constructor(menuApiUrl: string) {
        this.menuApiUrl = menuApiUrl;
    }

    _items(pageId: any): Promise<MenuItemDTO[]> {
        return new Promise<MenuItemDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            pageId: 1, text: 'first',
                            children: [
                                { pageId: 22, text: 'first-01' } as MenuItemDTO,
                                { pageId: 32, text: 'first-02' } as MenuItemDTO,
                                { pageId: 26, text: 'first-03' } as MenuItemDTO,
                            ]
                        } as MenuItemDTO,
                        {
                            pageId: 2, text: 'second',
                            children: [
                                {
                                    pageId: 22, text: 'second-01',
                                    children: [
                                        { pageId: 22, text: 'second-01-01' } as MenuItemDTO,
                                        { pageId: 32, text: 'second-01-02' } as MenuItemDTO,
                                    ]
                                } as MenuItemDTO,
                                {
                                    pageId: 32, text: 'second-02', children: [
                                        { pageId: 32, text: 'second-02-01' } as MenuItemDTO,
                                    ]
                                } as MenuItemDTO,
                            ]
                        } as MenuItemDTO,
                        { pageId: 3, text: 'third' } as MenuItemDTO,
                    ]
                );
            }, 2000);
        });

    }
    getCurrentUser(pageId: any): Promise<MenuItemDTO[]> {
        return new Promise<MenuItemDTO[]>((resolve, reject) => {
            Axios.get<MenuItemDTO[]>(this.menuApiUrl + '/' + pageId).then((response) => {
                resolve(response.data);
            }).catch((reason) => { reject(reason); });
        });
    }
}