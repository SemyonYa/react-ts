//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { MassOperationParamDTO } from './MassOperationParamDTO';

export class MassOperationDTO
{
	public id: string;
	public name: string;
	public procedureName: string;
	public fieldIDName: string;
	public id_AdmScalarDataType: string;
	public fieldIDNameTemplate: string;
	public massOperationTypeCode: string;
	public bodyParams: MassOperationParamDTO[];
	public headerParams: MassOperationParamDTO[];
	public isSingleton: boolean;
	public isLocked: boolean;
	public lockDate: Date;
}
