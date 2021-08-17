import * as axios from "axios";
import { TemplateDTO } from "../models/data-binding/TemplateDTO";
import { TemplateFieldDTO } from "../models/data-binding/TemplateFieldDTO";
import { DataSourceResult } from "./DataSourceResult";
import data from './templates.json';

export class TemplateStore {
    items: TemplateDTO[];
    templateUrl: string;
    constructor(baseUrl: string) {
        this.templateUrl = `${baseUrl}/api/Configuration/DataTemplate`;
        // TODO: remove
        this.items = data['data'] as TemplateDTO[];
    }

    getAll(): Promise<TemplateDTO[]> {
        console.log(this.items);
        // return this.items;

        return new Promise<TemplateDTO[]>((resolve, reject) => {
            resolve(this.items);
            // axios.default.get<TemplateDTO[]>(`${this.templateUrl}`)
            //     .then(
            //         (response) => { resolve(response.data); })
            //     .catch(
            //         (reason) => { reject(reason); }
            //     );
        });
    }

    getItem(templateId: string): Promise<TemplateDTO> {
        return new Promise<TemplateDTO>((resolve, reject) => {
            resolve(this.items[0]);
            // axios.default.get<TemplateDTO[]>(`${this.templateUrl}/${templateId}`)
            //     .then(
            //         (response) => { resolve(response.data); })
            //     .catch(
            //         (reason) => { reject(reason); }
            //     );
        });
    }

    getItemByCode = (code: string) => {
        return null;
    }

    post = (template: TemplateDTO): string => {
        return 'guid';
    }

    put = (template: TemplateDTO) => { }

    delete = (templateId: string) => { }

    getUsage = (templateId: string): string[] => {
        return [];
    }

    getFields = (templateId: string): DataSourceResult => {
        return null;
    }
}