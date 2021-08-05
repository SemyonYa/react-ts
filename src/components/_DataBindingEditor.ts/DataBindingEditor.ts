import * as React from 'react';
import { TemplateDTO } from '../../models/TemplateDTO';
import { TemplateFieldDTO } from '../../models/TemplateFieldDTO';
import { TemplateStore } from '../../store/TemplateStore';

export interface IDataBindingEditorProps {
    template?: TemplateDTO;
    store?: TemplateStore;
}

export interface IDataBindingEditorState {
    id: any,
    isUser: boolean,
    name: string,
    id_TemplateUpload: any,
    uploadTemplate: TemplateDTO,
    xpos: number,
    ypos: number,
    procedureName: string,
    topRows: number,
    code: string,
    codeSQL: string,
    isCache: boolean,
    templateFields: TemplateFieldDTO[],
    conditionObjects: any[],
    conditionParameters: any[],
    filtering: any,
    validation: any,
    admObject: any,
    id_DataSource: any,
    id_TemplateType: string,
    procedureManager: string,
    massOperations: any[],
    massOperationsNoSelection: any[],
    isSubquery: boolean,
    isLogChanges: boolean,
    catalogTemplateForParameters: TemplateDTO[],
    catalogTemplateForFields: TemplateDTO[],
    uploadTemplateForTemplates: TemplateDTO[],
    massOperationParamTemplateForTemplates: TemplateDTO[],
    subQueryTemplateForTemplates: TemplateDTO[],
    dataSourceForUserTemplates: TemplateDTO[],
    tableReferences: any[],
}

export class DataBindingEditor extends React.Component<IDataBindingEditorProps, IDataBindingEditorState> {

    constructor(props: IDataBindingEditorProps) {
        super(props);
        this.state = {
            id: null,
            isUser: null,
            name: null,
            id_TemplateUpload: null,
            uploadTemplate: null,
            xpos: null,
            ypos: null,
            procedureName: null,
            topRows: null,
            code: null,
            codeSQL: null,
            isCache: null,
            templateFields: [],
            conditionObjects: [],
            conditionParameters: [],
            filtering: null,
            validation: null,
            admObject: null,
            id_DataSource: null,
            id_TemplateType: null,
            procedureManager: null,
            massOperations: [],
            massOperationsNoSelection: [],
            isSubquery: null,
            isLogChanges: null,
            catalogTemplateForParameters: [],
            catalogTemplateForFields: [],
            uploadTemplateForTemplates: [],
            massOperationParamTemplateForTemplates: [],
            subQueryTemplateForTemplates: [],
            dataSourceForUserTemplates: [],
            tableReferences: [],
        }
    }

    render() {
        return (
            React.createElement('div', {},
                React.createElement('div', {}, 'asdasd')
            )
        );
    }
}
