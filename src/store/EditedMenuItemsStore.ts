import * as axios from 'axios';
import { EditedMenuItemDTO } from '../models/EditedMenuItemDTO';

const Axios = axios.default;

export class EditedMenuItemsStore {
    private menuApiUrl: string;

    constructor(menuApiUrl: string) {
        this.menuApiUrl = menuApiUrl;
    }

    getPageMenu(menuId: any, pageId: any): Promise<EditedMenuItemDTO[]> {
        return this._roots();
        return new Promise<EditedMenuItemDTO[]>((resolve, reject) => {
            // Axios.get<EditedMenuItemDTO[]>(this.menuApiUrl + '/' + menuId + '/page/' + pageId).then((response) => {
            //     resolve(response.data);
            // }).catch((reason) => { reject(reason); });
        });
    }

    getChildren(menuItemId: any): Promise<EditedMenuItemDTO[]> {
        return this._children(menuItemId);
        return new Promise<EditedMenuItemDTO[]>((resolve, reject) => {
            Axios.get<EditedMenuItemDTO[]>(this.menuApiUrl + '/' + menuItemId + '/children').then((response) => {
                resolve(response.data);
            }).catch((reason) => { reject(reason); });
        });
    }

    ///
    /// TODO: DELETE
    /// FAKES
    ///

    // TODO: delete
    private _roots = (): Promise<EditedMenuItemDTO[]> => {
        return new Promise<EditedMenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([1, 2, 3].map(i => {
                        return {
                            id: i,
                            name: `Item ${i}`,
                            orderIndex: i,
                            children: i === 2 ? [
                                {
                                    id: i * 10 + 1,
                                    name: `Item ${i} child`,
                                    orderIndex: i,
                                    children: []
                                }
                            ] : []
                        } as EditedMenuItemDTO;
                    }));
                }, 1000);
            }
        );
    }

    // TODO: delete
    private _children = (parentId: string): Promise<EditedMenuItemDTO[]> => {
        return new Promise<EditedMenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([1, 2, 3].map(i => {
                        return {
                            id: `${parentId}-${i}`,
                            name: `Item ${parentId}-${i}`,
                            orderIndex: i,
                            internalPageId: parentId.length >= 3 ? `${parentId}-${i}` : null,
                            // parentId
                        } as EditedMenuItemDTO;
                    }));
                }, 1000);
            }
        )
    }
}