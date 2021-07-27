import * as axios from 'axios';
import { PageTemplateDTO } from '../models/PageTemplateDTO';

export class TemplatesService {
    templateUrl: string;

    constructor(baseUrl: string) {
        this.templateUrl = baseUrl + '/api/Configuration/PageTemplate';
    }
    get() {
        return this._items();
        // TODO 
        return new Promise<PageTemplateDTO[]>((resolve, reject) => {
            axios.default.get<PageTemplateDTO[]>(this.templateUrl)
                .then(
                    response => { resolve(response.data) },
                    reason => { reject(reason) }
                )
        })
    }


    // TODO: 
    private _items = () => {
        return new Promise<PageTemplateDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.__items)
            }, 500);
        });
    }

    private __items: PageTemplateDTO[] = [
        { id: '1', name: 'Item 1' } as PageTemplateDTO,
        { id: '2', name: 'Item 2' } as PageTemplateDTO,
    ];
}