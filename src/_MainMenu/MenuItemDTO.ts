export class MenuItemDTO {
    // public pageId: any;
    // public text: string;
    // public parameters: { [key: string]: any };
    // public children: MenuItemDTO[];

	public id: any;
	public parentId: any;
	public name: string;
	public orderIndex: number;
	public externalUrl: string;
	public internalPageId: any;
	public parametersObjectJson: string;
}