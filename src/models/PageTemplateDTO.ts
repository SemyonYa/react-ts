import { PageTemplateSectionDTO } from './PageTemplateSectionDTO';

export class PageTemplateDTO
{
	public id: any;
	public name: string;
	public layoutComponentName: string;
	public sections: PageTemplateSectionDTO[];
}