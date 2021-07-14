export class RoutePartDetailsDTO {
    id: string;
    name: string;
    isPage: boolean;
    children: RoutePartDetailsDTO[];
}