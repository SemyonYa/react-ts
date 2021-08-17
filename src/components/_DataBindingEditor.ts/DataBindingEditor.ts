import * as React from 'react';
import { CompareLogicDTO } from '../../models/data-binding/CompareLogicDTO';
import { TemplateDTO } from '../../models/data-binding/TemplateDTO';
import { TemplateStore } from '../../store/TemplateStore';
import { ConditionObjectStore } from '../../store/ConditionObjectStore';
import { ConditionObjectDTO } from '../../models/data-binding/ConditionObjectDTO';
import { ConditionParameterStore } from '../../store/ConditionPrameterStore';
import { ConditionParameterDTO } from '../../models/data-binding/ConditionParameterDTO';
import { TemplateFieldDTO } from '../../models/data-binding/TemplateFieldDTO';
import { AdmObjectFieldDTO } from '../../models/data-binding/AdmObjectFieldDTO';
import { Filter } from "@progress/kendo-react-data-tools";

export interface IDataBindingEditorProps {
    template?: TemplateDTO;
    templateStore: TemplateStore;
    conditionObjectStore: ConditionObjectStore;
    conditionParameterStore: ConditionParameterStore;
}

export interface IDataBindingEditorState {
    template: TemplateDTO,
    conditionObjects: ConditionObjectDTO[],
    conditionParameters: ConditionParameterDTO[],
    isParam: boolean,
    isSQLTemplateType: boolean,
    editingTemplateField: TemplateFieldDTO
}

export class DataBindingEditor extends React.Component<IDataBindingEditorProps, IDataBindingEditorState> {
    private TemplateTypes: { key: string, value: string }[] = [
        { key: '1', value: 'Таблица' },
        { key: '2', value: 'Условие' },
    ]


    constructor(props: IDataBindingEditorProps) {
        super(props);
        let initialTemplate = new TemplateDTO();
        this.state = {
            template: initialTemplate,
            conditionObjects: null,
            isParam: true,
            isSQLTemplateType: true,
            conditionParameters: [],
            editingTemplateField: null
        }
    }


    async componentDidMount() {
        const template = await this.props.templateStore.getItem('');
        const conditionObjects: ConditionObjectDTO[] = this.props.conditionObjectStore.getAll();
        const conditionParameters: ConditionParameterDTO[] = conditionObjects.length > 0 ? this.props.conditionParameterStore.getAll(conditionObjects[0].id) : [];
        template.conditionObjects = [conditionObjects[0]];
        this.setState({ template, conditionObjects, conditionParameters });
    }

    private changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const template = this.state.template;
        template.name = e.target.value;
        this.setState({ template });
    }

    private changeIsUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const template = this.state.template;
        template.isUser = e.target.checked;
        this.setState({ template });
    }

    private changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const template = this.state.template;
        template.code = e.target.value;
        this.setState({ template });
    }

    private changeTemplateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ isSQLTemplateType: e.target.value === '1' })
    }

    private changeConditionObject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const template = this.state.template;
        const currentConditionObject: ConditionObjectDTO = this.state.conditionObjects.find(co => co.id === e.currentTarget.value);
        template.conditionObjects = currentConditionObject ? [currentConditionObject] : [];
        template.fields = null;
        const conditionParameters: ConditionParameterDTO[] = currentConditionObject ? this.props.conditionParameterStore.getAll(currentConditionObject.id) : [];
        this.setState({ template, conditionParameters });
    }

    private changeIsLogChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const template = this.state.template;
        template.isLogChanges = e.target.checked;
        this.setState({ template });
    }

    private changeIsParam = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ isParam: e.target.checked });
    }

    private changeProcedureManager = (e: React.ChangeEvent<HTMLInputElement>) => {
        const template = this.state.template;
        template.procedureManager = e.target.value;
        this.setState({ template });
    }

    private changeCodeSQL = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const template = this.state.template;
        template.codeSQL = e.target.value;
        this.setState({ template });
    }

    private changeIsCache = (e: React.ChangeEvent<HTMLInputElement>) => {
        const template = this.state.template;
        template.isCache = e.target.checked;
        this.setState({ template });
    }

    // TODO: when multiple data sources will be use
    private changeObjectSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const template = this.state.template;
        this.setState({ template });
    }

    private toggleFieldInReport = (field: AdmObjectFieldDTO) => {
        const templateField: TemplateFieldDTO = { id: field.id, name: field.text, } as TemplateFieldDTO;
        const template = this.state.template;
        const currentTemplateField = template.fields.find(t => t.id === templateField.id);
        if (currentTemplateField) {
            template.fields = template.fields.filter(f => f !== currentTemplateField);
        } else {
            template.fields.push(templateField);
        }
        this.setState({ template })
    }

    private editField = (field: TemplateFieldDTO) => {
        if (this.state.editingTemplateField?.id !== field.id) {
            this.setState({ editingTemplateField: field });
        }
    }

    private saveEditedField = (field: TemplateFieldDTO) => {
        console.log(field);
        const currentField: TemplateFieldDTO = this.state.template.fields.find(f => f.id === field.id);
        [currentField.name, currentField.note] = [field.name, field.note];
        this.setState({ editingTemplateField: null });
    }


    // SUBMIT
    private submit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let newTemplate = new TemplateDTO();
        for (let key in newTemplate) {
            newTemplate[key] = this.state.template[key] ?? (this.props.template ? this.props.template[key] : null);
        }
        console.log("🚀 ~ file: DataBindingEditor.ts ~ line 146 ~ DataBindingEditor ~ this.state.template", this.state.template)
        console.log(newTemplate);
    }



    render() {
        if (this.state)
            return (
                React.createElement('form', { onSubmit: this.submit },
                    React.createElement('h6', {}, 'Источник данных'),
                    buildFormItem(
                        'Название',
                        React.createElement('input', { value: this.state.template?.name ?? this.props.template?.name ?? '', onChange: this.changeName })
                    ),
                    buildFormItem(
                        'Пользовательский',
                        React.createElement('input', { checked: this.state.template?.isUser ?? this.props.template?.isUser ?? false, disabled: true, onChange: this.changeIsUser, type: 'checkbox' })
                    ),
                    buildFormItem(
                        'Код уникальный',
                        React.createElement('input', { value: this.state.template?.code ?? this.props.template?.code ?? '', disabled: true, onChange: this.changeCode })
                    ),
                    buildFormItem(
                        'Тип источника данных',
                        React.createElement('select', { value: this.state.isSQLTemplateType ? '1' : '2', onChange: this.changeTemplateType },
                            React.Children.toArray(this.TemplateTypes.map(o =>
                                React.createElement('option', { value: o.key }, o.value)
                            ))
                        )
                    ),
                    buildFormItem(
                        'Источник данных',
                        React.createElement('select', { value: this.state.template?.conditionObjects?.[0]?.id ?? this.props.template?.conditionObjects?.[0]?.id ?? undefined, onChange: this.changeConditionObject },
                            (this.state.conditionObjects?.length > 0)
                                ? React.Children.toArray(this.state.conditionObjects.map(co =>
                                    React.createElement('option', { value: co.id }, co.rusName)
                                ))
                                : null
                        )
                    ),
                    buildFormItem(
                        'Логгировать изменения по объекту',
                        React.createElement('input', { checked: this.state.template.isLogChanges ?? this.props.template?.isLogChanges ?? false, onChange: this.changeIsLogChanges, type: 'checkbox' })
                    ),
                    this.state.isSQLTemplateType
                        // TODO: toggle
                        ? buildFormItem(
                            'Работа с параметрами / Работа с SQL',
                            React.createElement('input', { checked: this.state.isParam ?? false, onChange: this.changeIsParam, type: 'checkbox' })
                        )
                        : null,
                    !this.state.isSQLTemplateType
                        ? buildFormItem(
                            'Фильтры',
                            React.createElement(Filters)
                        )
                        : null,
                    this.state.isSQLTemplateType
                        ? React.createElement('div', {},
                            buildFormItem(
                                'SQL',
                                React.createElement('textarea', { value: this.state.template.codeSQL ?? this.props.template?.codeSQL ?? '', onChange: this.changeCodeSQL, rows: 10 })
                            ),
                            buildFormItem(
                                'Использовать кеш',
                                React.createElement('input', { checked: this.state.template.isCache ?? this.props.template?.isCache ?? false, onChange: this.changeIsCache, type: 'checkbox' })
                            ),
                            !this.state.isParam
                                ? buildFormItem(
                                    'Процедура-менеджер',
                                    React.createElement('input', { value: this.state.template.procedureManager ?? this.props.template?.procedureManager ?? '', onChange: this.changeProcedureManager })
                                )
                                : null,
                        ) : null,
                    buildFormItem(
                        'Параметры источника данных',
                        React.createElement(ConditionParameters, { params: this.state.conditionParameters })
                    ),
                    this.state.isSQLTemplateType
                        ? React.createElement('div', {},
                            this.state.isParam
                                ? React.createElement('div', {},
                                    buildFormItem(
                                        'Фильтры отчета',
                                        React.createElement(Filters)
                                        // React.createElement(Filter, { value: {}, onChange: () => { } })
                                    ),
                                ) : null,
                            buildFormItem(
                                'Колонки источника данных',
                                React.createElement('div', { style: { display: 'flex' } },
                                    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', flex: '0 0 50%' } },
                                        React.createElement('p', {}, 'Состав отчета'),
                                        React.Children.toArray(
                                            this.state.template?.fields?.map((field, index) =>
                                                React.createElement(TemplateField, { index, field, onClick: this.editField })
                                            )),
                                        React.createElement('button', {}, 'Скопировать названия из источника данных')
                                    ),
                                    this.state.editingTemplateField !== null
                                        ? React.createElement(FieldEditorForm, { field: this.state.editingTemplateField, onSubmit: this.saveEditedField })
                                        : null
                                )
                            ),
                            buildFormItem(
                                'Объект-источник',
                                React.createElement('select', { value: 2, onChange: this.changeObjectSource },
                                    this.state.conditionObjects
                                        ? React.Children.toArray(this.state.template.conditionObjects.map(o =>
                                            React.createElement('option', { value: o.id }, o.rusName)
                                        ))
                                        : null
                                )
                            ),
                            buildFormItem(
                                'Выберите поле в колонке',
                                React.createElement('ul', { style: { display: 'flex', flexDirection: 'column' } },
                                    this.state.template.conditionObjects?.[0].adm_Object.fields.map(field =>
                                        React.createElement(AdmObjectField, { field, onClick: this.toggleFieldInReport, key: field.id }
                                        )
                                    )
                                )
                            )
                        )
                        : null,


                    //SUBMIT
                    React.createElement('button', { type: 'submit' }, 'Сохранить'),
                    React.createElement('button', { type: 'button' }, 'Отмена')
                )
            );
    }
}

///
/// TemplateField
///

interface ITemplateFieldProps {
    index: number;
    field: TemplateFieldDTO;
    onClick(field: TemplateFieldDTO): void;
}

class TemplateField extends React.Component<ITemplateFieldProps> {

    onClick = () => {
        this.props.onClick(this.props.field);
    }

    render() {
        return (
            React.createElement('div', { onClick: this.onClick }, `${this.props.index + 1}. ${this.props.field.name}`)
        );
    }
}


///
/// AdmObjectField
///
interface IAdmObjectFieldProps {
    field: AdmObjectFieldDTO;
    onClick(field: AdmObjectFieldDTO): void;
}
interface IAdmObjectFieldState {
    added: boolean;
}

class AdmObjectField extends React.Component<IAdmObjectFieldProps, IAdmObjectFieldState> {

    constructor(props: IAdmObjectFieldProps) {
        super(props);
        this.state = {
            added: false
        }
    }

    onClick = () => {
        this.setState({ added: !this.state.added });
        this.props.onClick(this.props.field);
    }
    render() {
        return (
            React.createElement('li', { value: this.props.field.id },
                React.createElement('button', { type: 'button', onClick: this.onClick }, this.state.added ? '-' : '+'),
                ` ${this.props.field.text}`,
                this.state.added
                    ? 'Добавлено'
                    : null
            )
        );
    }
}

///
/// Field Editor
///
interface IFieldEditorFormProps {
    field: TemplateFieldDTO;
    onSubmit(field: TemplateFieldDTO): void;
}

interface IFieldEditorFormState {
    note: string;
    name: string;
}


// TODO: 
class FieldEditorForm extends React.Component<IFieldEditorFormProps, IFieldEditorFormState> {

    constructor(props: IFieldEditorFormProps) {
        super(props);
        this.state = {
            name: null,
            note: null
        };
    }

    changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        this.setState({ name });
    }
    changeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        const note = e.target.value;
        this.setState({ note });
    }

    submit = () => {
        const currentTemplateField = {
            id: this.props.field.id,
            name: this.state.name ?? this.props.field.name,
            note: this.state.note ?? this.props.field.note
        } as TemplateFieldDTO;
        this.props.onSubmit(currentTemplateField);
    }

    render() {
        return (
            React.createElement('div', { style: { border: 'solid 1px #ccc', flex: '50%' } },
                React.createElement('h6', {}, `Редактирование поля - ${this.props.field.name}`),
                buildFormItem(
                    'Название поля в интерфейсе',
                    React.createElement('input', { value: this.state.name ?? this.props.field.name ?? '', onChange: this.changeName })
                ),
                buildFormItem(
                    'Код поля в запросе',
                    React.createElement('input', { value: this.state.note ?? this.props.field.note ?? '', onChange: this.changeNote })
                ),
                React.createElement(Filters),
                React.createElement('button', { type: 'button', onClick: this.submit }, 'Сохранить')
            )
        );
    }
}


///
/// Data Source Params
///
interface IConditionParameters {
    params: ConditionParameterDTO[];
}

class ConditionParameters extends React.Component<IConditionParameters> {
    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: 'solid 1px #ccc' } },
                React.createElement('div', {},
                    React.createElement('span', {}, '+'),
                    React.createElement('span', {}, '-'),
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    React.Children.toArray(this.props.params.map(p =>
                        React.createElement('div', {}, `${p.id} | ${p.name} | ${p.description}`)
                    ))
                )
            )
        );
    }
}

///
/// Filters
///

interface IFiltersProps {
    item: CompareLogicDTO;
}
interface IFiltersState {

}

class Filters extends React.Component<IFiltersProps, IFiltersState> {
    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: 'solid 1px #ccc' } },
                React.createElement('div', {},
                    React.createElement('span', {}, ' and '),
                    React.createElement('span', {}, ' or '),
                    React.createElement('span', {}, ' + '),
                    React.createElement('span', {}, ' +[] '),
                ),
                React.createElement('div', {},
                    React.createElement('input', { placeholder: 'name' }),
                    React.createElement('input', { placeholder: 'column' })
                ),
            )
        );
    }
}

function buildFormItem(label: string, elem: React.ReactNode) {
    return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', margin: '.25rem 0' } },
        React.createElement('label', { style: { fontWeight: 600 } }, label),
        elem
    );
}