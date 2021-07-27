
import * as axios from "axios";
import { NavigationMenuDTO } from "../models/NavigationMenuDTO"

export class MenuStore {
    baseUrl = 'https://qwe.ret';
    menuUrl = this.baseUrl + '/api/Configuration/Menu'
    get() {
        return this._items();
        return new Promise<NavigationMenuDTO[]>((resolve, reject) => {
            axios.default.get<NavigationMenuDTO[]>(this.menuUrl)
                .then(
                    response => { resolve(response.data) },
                    reason => { reject(reason) }
                )
        })
    }

    create(item: NavigationMenuDTO) {
        return new Promise((resolve, reject) => {
            axios.default.post(this.menuUrl, item)
                .then(
                    response => { resolve(response.data) },
                    reason => { reject(reason) }
                )
        });
    }

    delete(id: string) {
        return new Promise((resolve, reject) => {
            axios.default.delete(`${this.menuUrl}/${id}`)
                .then(
                    response => { resolve(response.data) },
                    reason => { reject(reason) }
                )
        });
    }

    // TODO: 
    private _items = () => {
        return new Promise<NavigationMenuDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: '1', name: 'Item 1' } as NavigationMenuDTO,
                    { id: '2', name: 'Item 2' } as NavigationMenuDTO,
                ])
            }, 500);
        });
    }
}