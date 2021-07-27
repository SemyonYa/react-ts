
import * as axios from "axios";
import { NavigationMenuDTO } from "../models/NavigationMenuDTO"

export class MenuEditingService {
    menuUrl: string;

    constructor(baseUrl: string) {
        this.menuUrl = baseUrl + '/api/Configuration/Menu';
    }
    get() {
        return this._items();
        // TODO 
        return new Promise<NavigationMenuDTO[]>((resolve, reject) => {
            axios.default.get<NavigationMenuDTO[]>(this.menuUrl)
                .then(
                    response => { resolve(response.data) },
                    reason => { reject(reason) }
                )
        })
    }

    create(item: NavigationMenuDTO) {
        return this._create(item);
        // TODO
        return new Promise((resolve, reject) => {
            axios.default.post(this.menuUrl, item)
                .then(
                    response => { resolve(response.data) },
                    reason => { reject(reason) }
                )
        });
    }

    delete(id: string) {
        return this._delete(id);
        // TODO
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
                resolve(this.__items)
            }, 500);
        });
    }

    private _create = (item: NavigationMenuDTO) => {
        item.id = (+this.__items[this.__items.length - 1].id + 1).toString();
        this.__items.push(item);
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    private _delete = (id: string) => {
        this.__items = this.__items.filter(i => i.id !== id);
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    private __items: NavigationMenuDTO[] = [
        { id: '1', name: 'Item 1' } as NavigationMenuDTO,
        { id: '2', name: 'Item 2' } as NavigationMenuDTO,
    ];
}