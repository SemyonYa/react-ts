//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { TemplateFieldDTO } from './TemplateFieldDTO';
import { ConditionParameterDTO } from './ConditionParameterDTO';
import { TemplateDTO } from './TemplateDTO';
import { CompareLogicDTO } from './CompareLogicDTO';

export class ConditionCompareOperandDTO
{
	public id: any;
	public type: string;
	public value: string;
	public templateField: TemplateFieldDTO;
	public conditionParameter: ConditionParameterDTO;
	public template: TemplateDTO;
	public compareLogic: CompareLogicDTO;
}
