import * as React from 'react';
import { TemplateDTO } from '../../models/TemplateDTO';
import { TemplateFieldDTO } from '../../models/TemplateFieldDTO';
import { TemplateStore } from '../../store/TemplateStore';

export interface IDataBindingEditorProps {
    template?: TemplateDTO;
    store?: TemplateStore;
}

export interface IDataBindingEditorState {
    template: TemplateDTO
}

export class DataBindingEditor extends React.Component<IDataBindingEditorProps, IDataBindingEditorState> {
    private TemplateTypes: { key: string, value: string }[] = [
        { key: '1', value: 'Источник данных' },
        { key: '2', value: 'Условие' },
    ]


    constructor(props: IDataBindingEditorProps) {
        super(props);
        this.state = {
            template: new TemplateDTO()
        }
    }

    componentDidMount() {

    }

    private changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        this.setState({ name });
    }

    private changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value;
        this.setState({ code });
    }

    private changeTemplateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const templateType = e.target.value;
        this.setState({ id_TemplateType: templateType });
    }

    private changeDataSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const dataSource = e.target.value;
        this.setState({ id_DataSource: dataSource });
    }

    private changeProcedureManager = (e: React.ChangeEvent<HTMLInputElement>) => {
        const procedureManager = e.target.value;
        this.setState({ procedureManager });
    }
    private changeCodeSQL = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const codeSQL = e.target.value;
        this.setState({ codeSQL });
    }
    private changeIsCache = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isCache = e.target.checked;
        this.setState({ isCache });
    }

    // SUBMIT
    private submit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let newTemplate = new TemplateDTO();
        for (let key in newTemplate) {
            newTemplate[key] = this.state[key] ?? this.props.template[key];
        }
        console.log(newTemplate);
    }

    render() {
        return (
            React.createElement('form', { onSubmit: this.submit },
                React.createElement('h6', {}, 'Источник данных'),
                this.buildFormItem(
                    'Название',
                    React.createElement('input', { value: this.state.name ?? this.props.template?.name ?? '', onChange: this.changeName })
                ),
                this.buildFormItem(
                    'Код уникальный',
                    React.createElement('input', { value: this.state.code ?? this.props.template?.code ?? '', onChange: this.changeCode })
                ),
                this.buildFormItem(
                    'Тип шаблона',
                    React.createElement('select', { value: this.state.id_TemplateType ?? this.props.template?.id_TemplateType, onChange: this.changeTemplateType },
                        React.Children.toArray(this.TemplateTypes.map(o =>
                            React.createElement('option', { value: o.key }, o.value)
                        ))
                    )
                ),
                this.buildFormItem(
                    'Связанный объект данных',
                    React.createElement('select', { value: this.state.id_TemplateUpload ?? this.props.template?.id_TemplateUpload, onChange: this.changeDataSource })
                ),
                this.buildFormItem(
                    'Процедура-менеджер',
                    React.createElement('input', { value: this.state.procedureManager ?? this.props.template?.procedureManager ?? '', onChange: this.changeProcedureManager })
                ),
                this.buildFormItem(
                    'SQL',
                    React.createElement('textarea', { value: this.state.name ?? this.props.template?.name ?? '', onChange: this.changeCodeSQL, rows: 10 })
                ),
                this.buildFormItem(
                    'Использовать кеш',
                    React.createElement('input', { value: this.state.procedureManager ?? this.props.template?.procedureManager ?? '', onChange: this.changeIsCache, type: 'checkbox' })
                ),

                React.createElement('button', { type: 'submit' }, 'Сохранить')
            )
        );
    }

    private buildFormItem = (label: string, elem: React.ReactNode) => {
        return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', margin: '.25rem 0' } },
            React.createElement('label', {}, label),
            elem
        );
    }
}
