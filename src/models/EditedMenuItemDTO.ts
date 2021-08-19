import { MenuItemBaseDTO } from './MenuItemBaseDTO';

export class EditedMenuItemDTO extends MenuItemBaseDTO {
    public id: any;
    public children: EditedMenuItemDTO[];
}