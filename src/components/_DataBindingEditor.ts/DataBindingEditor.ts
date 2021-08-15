import * as React from 'react';
import { CompareLogicDTO } from '../../models/data-binding/CompareLogicDTO';
import { TemplateDTO } from '../../models/data-binding/TemplateDTO';
import { TemplateStore } from '../../store/TemplateStore';
import { ConditionObjectStore } from '../../store/ConditionObjectStore';
import { ConditionObjectDTO } from '../../models/data-binding/ConditionObjectDTO';

export interface IDataBindingEditorProps {
    template?: TemplateDTO;
    templateStore: TemplateStore;
    conditionObjectStore: ConditionObjectStore;
}

export interface IDataBindingEditorState {
    template: TemplateDTO,
    conditionObjects: ConditionObjectDTO[],
    isParam: boolean,
    isSQLTemplateType: boolean
}

export class DataBindingEditor extends React.Component<IDataBindingEditorProps, IDataBindingEditorState> {
    private TemplateTypes: { key: string, value: string }[] = [
        { key: '1', value: 'Таблица' },
        { key: '2', value: 'Условие' },
    ]


    constructor(props: IDataBindingEditorProps) {
        super(props);
        let initialTemplate = new TemplateDTO();
        initialTemplate.uploadTemplateId = '1';
        this.state = {
            template: initialTemplate,
            conditionObjects: null,
            isParam: true,
            isSQLTemplateType: true
        }
    }

    componentDidMount() {
        const template = this.props.templateStore.getItem('');
        console.log("🚀 ~ file: DataBindingEditor.ts ~ line 45 ~ DataBindingEditor ~ componentDidMount ~ template", template)
        const conditionObjects: ConditionObjectDTO[] = this.props.conditionObjectStore.getAll();
        console.log("🚀 ~ file: DataBindingEditor.ts ~ line 46 ~ DataBindingEditor ~ componentDidMount ~ conditionObjects", conditionObjects)
        this.setState({ template, conditionObjects });
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
        // const template = this.state.template;
        // template.id_TemplateType = e.target.value;
        // this.setState({ template });
    }

    // private changeParamsOrSQL = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const template = this.state.template;
    //     // TODO: 
    //     // template.id_TemplateType = e.target.value;
    //     this.setState({ template });
    // }

    private changeDataSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const template = this.state.template;
        template.dataSourceId = e.target.value;
        this.setState({ template });
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

    private changeObjectSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const template = this.state.template;
        // TODO: real
        // template.id_DataSource = e.target.value;
        this.setState({ template });
    }


    // SUBMIT
    private submit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let newTemplate = new TemplateDTO();
        for (let key in newTemplate) {
            newTemplate[key] = this.state.template[key] ?? (this.props.template ? this.props.template[key] : null);
        }
        console.log(newTemplate);
    }

    render() {
        // let currentTemplate = new TemplateDTO();
        // for (let key in currentTemplate) {
        //     currentTemplate[key] = this.state.template[key] ?? (this.props.template ? this.props.template[key] : null);
        // }

        return (
            React.createElement('form', { onSubmit: this.submit },
                React.createElement('h6', {}, 'Источник данных'),
                this.buildFormItem(
                    'Название',
                    React.createElement('input', { value: this.state.template?.name ?? this.props.template?.name ?? '', onChange: this.changeName })
                ),
                this.buildFormItem(
                    'Пользовательский',
                    React.createElement('input', { checked: this.state.template?.isUser ?? this.props.template?.isUser ?? false, disabled: true, onChange: this.changeIsUser, type: 'checkbox' })
                ),
                this.buildFormItem(
                    'Код уникальный',
                    React.createElement('input', { value: this.state.template?.code ?? this.props.template?.code ?? '', disabled: true, onChange: this.changeCode })
                ),
                this.buildFormItem(
                    'Тип источника данных',
                    React.createElement('select', { value: this.state.isSQLTemplateType ? '1' : '2', onChange: this.changeTemplateType },
                        React.Children.toArray(this.TemplateTypes.map(o =>
                            React.createElement('option', { value: o.key }, o.value)
                        ))
                    )
                ),
                this.buildFormItem(
                    'Источник данных',
                    React.createElement('select', { value: this.state.template.conditionObjects?.length > 0 ? this.state.conditionObjects[0].id : '', onChange: this.changeDataSource },
                        this.state.conditionObjects?.length > 0
                            ? React.Children.toArray(this.state.conditionObjects.map(co =>
                                React.createElement('option', { id: co.id }, co.rusName)))
                            : null
                    )
                ),
                this.buildFormItem(
                    'Логгировать изменения по объекту',
                    React.createElement('input', { checked: this.state.template.isLogChanges ?? this.props.template?.isLogChanges ?? false, onChange: this.changeIsLogChanges, type: 'checkbox' })
                ),
                this.state.isSQLTemplateType
                    // TODO: toggle
                    ? this.buildFormItem(
                        'Работа с параметрами / Работа с SQL',
                        // React.createElement(Switch, { onChange: this.changeIsParam })
                        React.createElement('input', { checked: this.state.isParam ?? false, onChange: this.changeIsParam, type: 'checkbox' })
                    )
                    : null,
                !this.state.isSQLTemplateType
                    ? this.buildFormItem(
                        'Фильтры',
                        React.createElement(Filters)
                    )
                    : null,
                this.state.isSQLTemplateType
                    ? React.createElement('div', {},
                        this.buildFormItem(
                            'SQL',
                            React.createElement('textarea', { value: this.state.template.codeSQL ?? this.props.template?.codeSQL ?? '', onChange: this.changeCodeSQL, rows: 10 })
                        ),
                        this.buildFormItem(
                            'Использовать кеш',
                            React.createElement('input', { checked: this.state.template.isCache ?? this.props.template?.isCache ?? false, onChange: this.changeIsCache, type: 'checkbox' })
                        ),
                        // TODO: 
                        !this.state.isParam
                            ? this.buildFormItem(
                                'Процедура-менеджер',
                                React.createElement('input', { value: this.state.template.procedureManager ?? this.props.template?.procedureManager ?? '', onChange: this.changeProcedureManager })
                            )
                            : null,
                    ) : null,
                this.buildFormItem(
                    'Параметры источника данных',
                    // TODO: 
                    React.createElement(DataSourceParams)
                ),
                this.state.isSQLTemplateType
                    ? React.createElement('div', {},
                        this.state.isParam
                            ? React.createElement('div', {},
                                this.buildFormItem(
                                    'Фильтры отчета',
                                    React.createElement(Filters)
                                ),
                            ) : null,
                        this.buildFormItem(
                            'Колонки источника данных',
                            React.createElement('div', { style: { display: 'flex' } },
                                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', flex: '0 0 50%' } },
                                    React.createElement('p', {}, 'Состав отчета'),
                                    React.Children.toArray(
                                        [1, 2, 3, 4].map(i =>
                                            React.createElement('div', {}, `${i}. Item #${i}`)
                                        )),
                                    React.createElement('button', {}, 'Скопировать названия из источника данных')
                                ),
                                React.createElement(FieldEditorForm, { field: {} })
                            )
                        ),
                        this.buildFormItem(
                            'Объект-источник',
                            React.createElement('select', { value: 2, onChange: this.changeObjectSource },
                                React.Children.toArray([1, 2, 3].map(o =>
                                    React.createElement('option', { value: o }, o)
                                ))
                            )
                        ),
                        this.buildFormItem(
                            'Выберите поле в колонке',
                            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                                React.Children.toArray([1, 2, 3, 4, 5, 6, 7].map(o =>
                                    React.createElement('option', { value: o },
                                        `+ field ${o}`
                                    )
                                ))
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

    private buildFormItem = (label: string, elem: React.ReactNode) => {
        return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', margin: '.25rem 0' } },
            React.createElement('label', { style: { fontWeight: 600 } }, label),
            elem
        );
    }
}


///
/// Field Editor
///
interface IFieldEditorFormProps {
    field: any;
}
interface IFieldEditorFormState {

}
// TODO: 
class FieldEditorForm extends React.Component<IFieldEditorFormProps> {
    render() {
        return (
            React.createElement('div', { style: { border: 'solid 1px #ccc', flex: '50%' } },
                React.createElement('h6', {},
                    'TODO: Редактирование поля XXX'
                )
            )
        );
    }
}


///
/// Data Source Params
///

class DataSourceParams extends React.Component {
    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: 'solid 1px #ccc' } },
                React.createElement('div', {},
                    React.createElement('span', {}, '+'),
                    React.createElement('span', {}, '-'),
                ),
                // React.createElement(Grid, { data: [1, 2, 3, 4, 5].map(i => <{ id: number, name: string }>{ id: i, name: `Item #${i}` }), style: {} },
                //     React.createElement(GridColumn, { field: 'id', width: '30px' }),
                //     React.createElement(GridColumn, { field: 'name', width: '230px' })
                // )
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    React.Children.toArray([1, 2, 3, 4, 5, 6, 7].map(o =>
                        React.createElement('div', {}, `${o} | Param ${o}`)
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