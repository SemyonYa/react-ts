import { TemplateDTO } from "../models/data-binding/TemplateDTO";
import { TemplateFieldDTO } from "../models/data-binding/TemplateFieldDTO";
import { DataSourceResult } from "./DataSourceResult";
import data from './templates.json';

export class TemplateStore {
    items: TemplateDTO[];
    routeUrl: string;
    constructor(baseUrl: string) {
        this.routeUrl = `${baseUrl}/api/Configuration/DataTemplate`;
        this.items = data['data'] as TemplateDTO[];
    }

    getAll = (): TemplateDTO[] => {
        console.log(this.items);
        return this.items;
    }

    getItem = (templateId: string): TemplateDTO => {
        return this.items[0];
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