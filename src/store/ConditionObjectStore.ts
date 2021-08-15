import { AdmObjectDTO } from "../models/data-binding/AdmObjectDTO";
import { AdmObjectFieldDTO } from "../models/data-binding/AdmObjectFieldDTO";
import { ConditionObjectDTO } from "../models/data-binding/ConditionObjectDTO";

export class ConditionObjectStore {
    getAll(): ConditionObjectDTO[] {
        return [1, 2, 3, 4].map(i => {
            return {
                id: `${i}`,
                rusName: `Table #${i}`,
                adm_Object: {
                    id: `${i * 10}`,
                    name: `Adm name #${i * 10}`,
                    rusName: `Adm rus name #${i * 10}`,
                    queueNumber: i,
                    fields: [1, 2, 3].map(j => {
                        return {
                            id: `${i}-${j}`,
                            rusName: `Rus name ${i}-${j}`,
                        } as AdmObjectFieldDTO;
                    })
                } as AdmObjectDTO
            } as ConditionObjectDTO
        });
    }
}