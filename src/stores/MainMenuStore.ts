import * as axios from "axios";
import { MenuItemDTO } from "../models/MenuItemDTO2";


export class MainMenuStore {
    private baseUrl: string;

    getRoots(): Promise<MenuItemDTO> {
        return this.get();
    }

    getChildren(parentId: string): Promise<MenuItemDTO> {
        return this.get(parentId);
    }

    private get(parentId: string = null): Promise<MenuItemDTO> {
        return new Promise<MenuItemDTO>((resolve, reject) => {
            const url = parentId ? this.baseUrl + '/api/Configuration/Menu/' + parentId : this.baseUrl + '/api/Configuration/Menu/';
            axios.default.get<MenuItemDTO>(url)
                .then(
                    (response) => { resolve(response.data); }
                )
                .catch(
                    (reason) => { reject(reason); }
                );
        });
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
}