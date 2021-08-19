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
            // resolve(this.items);
            axios.default.get<TemplateDTO[]>(`${this.templateUrl}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    getItem(templateId: string): Promise<TemplateDTO> {
        return new Promise<TemplateDTO>((resolve, reject) => {
            // resolve(this.items[0]);
            axios.default.get<TemplateDTO>(`${this.templateUrl}/${templateId}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    getItemByCode = (code: string) => {
        return new Promise<TemplateDTO>((resolve, reject) => {
            // resolve(this.items[0]);
            axios.default.get<TemplateDTO>(`${this.templateUrl}/ByCode/${code}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    create = (template: TemplateDTO): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            axios.default.post<any>(`${this.templateUrl}`, template)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    update = (template: TemplateDTO): Promise<void> => {
        return new Promise((resolve, reject) => {
            axios.default.put(`${this.templateUrl}`, template)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    delete = (templateId: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            axios.default.delete(`${this.templateUrl}/${templateId}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    usage = (templateId: string): Promise<string[]> => {
        return new Promise<string[]>((resolve, reject) => {
            axios.default.get<string[]>(`${this.templateUrl}/Usage/${templateId}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    fields = (templateId: string): Promise<DataSourceResult> => {
        return new Promise<DataSourceResult>((resolve, reject) => {
            axios.default.get<DataSourceResult>(`${this.templateUrl}/Fields/${templateId}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }
}