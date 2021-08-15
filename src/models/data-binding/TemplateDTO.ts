//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { TemplateFieldDTO } from './TemplateFieldDTO';
import { ConditionObjectDTO } from './ConditionObjectDTO';
import { ConditionParameterDTO } from './ConditionParameterDTO';
import { CompareLogicDTO } from './CompareLogicDTO';
import { AdmObjectDTO } from './AdmObjectDTO';
import { AdmObjectFieldDTO } from './AdmObjectFieldDTO';
import { MassOperationDTO } from './MassOperationDTO';

export class TemplateDTO
{
	public id: any;
	public isUser: boolean;
	public name: string;
	public uploadTemplateId: any;
	public uploadTemplate: TemplateDTO;
	public x_pos: number;
	public y_pos: number;
	public procedureName: string;
	public topRows: number;
	public code: string;
	public codeSQL: string; // 
	public isCache: boolean;
	public fields: TemplateFieldDTO[]; // колонки источника данных (for filters)
	public conditionObjects: ConditionObjectDTO[]; // источник данных (api/[abstraction]) свой store - mock
	public conditionParameters: ConditionParameterDTO[]; // Параметры источника данных
	public filtering: CompareLogicDTO;
	public validation: CompareLogicDTO; // Валидация
	public adm_Object: AdmObjectDTO;
	public dataSourceId: any;
	public type: string;
	public procedureManager: string;
	public massOperations: MassOperationDTO[];
	public massOperationsNoSelection: MassOperationDTO[];
	public isSubquery: boolean;
	public isLogChanges: boolean;
	public catalogTemplateForParameters: TemplateDTO[]; // Справочник
	public catalogTemplateForFields: TemplateDTO[];
	public uploadTemplateForTemplates: TemplateDTO[];
	public massOperationParamTemplateForTemplates: TemplateDTO[];
	public subQueryTemplateForTemplates: TemplateDTO[];
	public dataSourceForUserTemplates: TemplateDTO[];
	public tableReferences: AdmObjectFieldDTO[];
}
