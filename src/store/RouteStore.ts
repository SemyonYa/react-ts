import * as axios from "axios";
import { RoutePartDetailsDTO } from "../models/RoutePartDetailsDTO";

export interface IRouteResponse {
    Data: RoutePartDetailsDTO[];
    TotalRowCount: number;
}

export class RouteStore {
    routeUrl: string;
    constructor(baseUrl: string) {
        this.routeUrl = `${baseUrl}/api/Configuration/Routes`;

    }
    get(pageNumber: number, pageSize: number, searchValue: string = null) {
        console.log("🚀 ~ file: RouteStore.ts ~ line 20 ~ RouteStore ~ get ~ pageNumber, pageSize", pageNumber, pageSize)
        return searchValue ? this._search(searchValue) : this._list(pageNumber, pageSize);
        // TODO: 
        const url: string = this.routeUrl + (`/${searchValue}` ?? '');
        return new Promise<IRouteResponse>((resolve, reject) => {
            axios.default.get<IRouteResponse>(`${url}?pageSIze=${pageSize}&pageNumber=${pageNumber}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    getChildren(parentId: string): Promise<RoutePartDetailsDTO[]> {
        return this._children(parentId);
        // TODO: 
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            axios.default.get<RoutePartDetailsDTO[]>(`${this.routeUrl}/${parentId}`)
                .then(
                    (response) => { resolve(response.data); })
                .catch(
                    (reason) => { reject(reason); }
                );
        });
    }

    ///
    /// TODO: DELETE FAKE REQUESTS 
    private _list(pageNumber: number = 1, pageSize: number = 10): Promise<IRouteResponse> {
        let items: number[] = Array(pageSize).fill(0).map((_, i) => (pageNumber - 1) * pageSize + i + 1);

        return new Promise<IRouteResponse>((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    {
                        Data: items.map(i => <RoutePartDetailsDTO>{ id: `${i}`, name: `Route ${i}`, isPage: false, children: [] }),
                        TotalRowCount: 35,
                    }
                );
            }, 700);
        })
    }

    private _children(parentId: string): Promise<RoutePartDetailsDTO[]> {
        return new Promise<RoutePartDetailsDTO[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3].map(
                    i => {
                        return { id: `${parentId}-${i}`, name: `Route ${parentId}-${i}`, isPage: true, children: [] } as RoutePartDetailsDTO;
                    }
                ));
            }, 700);
        })
    }

    private _search(search: string): Promise<IRouteResponse> {
        return new Promise<IRouteResponse>((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    {
                        Data: [
                            {
                                id: search + '1', name: 'Route 1', isPage: false, children: [
                                    {
                                        id: search + '1-1', name: 'Route 2', isPage: false, children: [
                                            { id: search + '1-1-1', name: `${search} - third level`, isPage: false, children: [] } as RoutePartDetailsDTO,
                                        ]
                                    } as RoutePartDetailsDTO,
                                ]
                            } as RoutePartDetailsDTO,
                            {
                                id: search + '2', name: 'Route 2', isPage: false, children: [
                                    { id: search + '2-1', name: `${search} - second level`, isPage: false, children: [] } as RoutePartDetailsDTO,
                                ]
                            } as RoutePartDetailsDTO,
                            { id: search + '3', name: `${search} - top level`, isPage: false, children: [] } as RoutePartDetailsDTO,
                        ],
                        TotalRowCount: 10
                    }
                );
            }, 700);
        })
    }
}
