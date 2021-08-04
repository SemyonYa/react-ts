import { TemplateDTO } from "../models/TemplateDTO";
import { TemplateFieldDTO } from "../models/TemplateFieldDTO";
import { DataSourceResult } from "./DataSourceResult";

export class TemplateStore {
    routeUrl: string;
    constructor(baseUrl: string) {
        this.routeUrl = `${baseUrl}/api/Configuration/DataTemplate`;
    }

    getAll = (): TemplateDTO[] => {
        return [];
    }

    getItem = (templateId: string): TemplateDTO => {
        return null;
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