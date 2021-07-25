import * as axios from "axios";
import { MenuItemDTO } from "../models/MenuItemDTO2";


export class MainMenuStore {
    private baseUrl: string;

    private get(parentId: string = null): Promise<MenuItemDTO[]> {
        return new Promise<MenuItemDTO[]>((resolve, reject) => {
            const url = parentId ? this.baseUrl + '/api/Configuration/Menu/' + parentId : this.baseUrl + '/api/Configuration/Menu/';
            axios.default.get<MenuItemDTO[]>(url)
                .then(
                    (response) => { resolve(response.data); }
                )
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    getRoots(): Promise<MenuItemDTO[]> {
        // return this.get();
        return this._roots();
    };

    getChildren(parentId: string): Promise<MenuItemDTO[]> {
        // return this.get(parentId);
        return this._children(parentId);
    }

    create(data: any) {
        return new Promise<MenuItemDTO>((resolve, reject) => {
            axios.default.post<MenuItemDTO>(this.baseUrl + '/api/Configuration/Menu/', data)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    update(data: any) {
        return new Promise<MenuItemDTO>((resolve, reject) => {
            axios.default.put<MenuItemDTO>(this.baseUrl + '/api/Configuration/Menu/', data)
                .then(
                    (response) => { resolve(response.data); }
                )
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    delete(id: string) {
        return new Promise<MenuItemDTO>((resolve, reject) => {
            axios.default.delete<MenuItemDTO>(this.baseUrl + '/api/Configuration/Menu/' + id)
                .then(
                    (response) => { resolve(response.data); }
                )
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    ///
    /// TODO: DELETE
    /// FAKES
    ///

    // TODO: delete
    private _roots = (): Promise<MenuItemDTO[]> => {
        return new Promise<MenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([1, 2, 3].map(i => {
                        return { id: i, name: `Item ${i}`, orderIndex: i } as MenuItemDTO;
                    }));
                }, 1000);
            }
        );
    }

    // TODO: delete
    private _children = (parentId: string): Promise<MenuItemDTO[]> => {
        return new Promise<MenuItemDTO[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log(parentId);

                    resolve([1, 2, 3].map(i => {
                        return {
                            id: `${parentId}-${i}`,
                            name: `Item ${parentId}-${i}`,
                            orderIndex: i,
                            internalPageId: parentId.length >= 3 ? `${parentId}-${i}` : null
                        } as MenuItemDTO;
                    }));
                }, 1000);
            }
        )
    }
}