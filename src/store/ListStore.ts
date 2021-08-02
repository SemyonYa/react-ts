import * as axios from "axios";
import { IItemModel } from "../components/DropDownList";


export class ListStore {
    private baseUrl: string;

    get(searchValue: string = null): Promise<IItemModel[]> {
        return this._list(searchValue);
        // return new Promise<MenuItemDTO[]>((resolve, reject) => {
        //     const url = parentId ? this.baseUrl + '/api/Configuration/Menu/' + parentId : this.baseUrl + '/api/Configuration/Menu/';
        //     axios.default.get<MenuItemDTO[]>(url)
        //         .then(
        //             (response) => { resolve(response.data); }
        //         )
        //         .catch(
        //             (reason) => { reject(reason); }
        //         );
        // });
    }

    private _list = (searchValue: string): Promise<IItemModel[]> => {
        return new Promise<IItemModel[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(searchValue.split('').map((value, index) => {
                        return { id: value, value: `Item ${value}` } as IItemModel;
                    }));
                }, 1000);
            }
        );
    }
}
