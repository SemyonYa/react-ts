using System;
using System.Collections.Generic;

namespace SUEK.WebPlatform.DataServices.Models.DTO
{
    /// <summary>
    /// Шаблон
    /// </summary>
    [Reinforced.Typings.Attributes.TsClass(Namespace = "Models.DTO.Data")]
    public partial class TemplateDTO
    {
        /// <summary>
        /// Идентификатор шаблона
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Признак пользовательского шаблона
        /// </summary>
        public bool IsUser { get; set; }

        /// <summary>
        /// Название типа
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Шаблон для загрузки - если нужно подменить
        /// </summary>
        public Guid? id_TemplateUpload { get; set; }

        /// <summary>
        /// Шаблон для загрузки (родительский тип)
        /// </summary>
        public TemplateDTO UploadTemplate { get; set; }

        /// <summary>
        /// Номер колонки с которой начинается таблица в Excel-файле. Нумерация начинается с 1
        /// </summary>
        public int? Xpos { get; set; }

        /// <summary>
        /// Номер строки с которой начинается таблица в Excel-файле. Нумерация начинается с 1
        /// </summary>
        public int? Ypos { get; set; }

        /// <summary>
        /// Название процедуры, выполняемой после загрузки файла. Принимает на вход ID из ImportFile
        /// </summary>
        public string ProcedureName { get; set; }

        /// <summary>
        /// TOP (N) в собираемом по шаблону SQL-запросе
        /// </summary>
        public int? TopRows { get; set; }

        /// <summary>
        /// Код шаблона
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Код собираемого по шаблону SQL-запроса
        /// </summary>
        public string CodeSQL { get; set; }

        /// <summary>
        /// Используется ли кэш для собираемого по шаблону SQL-запроса
        /// </summary>
        public bool? IsCache { get; set; }
        
        /// <summary>
        /// Поля шаблона
        /// </summary>
        public IEnumerable<TemplateFieldDTO> TemplateFields { get; set; }

        /// <summary>
        /// Условные объекты
        /// </summary>
        public IEnumerable<ConditionObjectDTO> ConditionObjects { get; set; }

        /// <summary>
        /// Параметры собираемого по шаблону SQL-запроса
        /// </summary>
        public IEnumerable<ConditionParameterDTO> ConditionParameters { get; set; }

        /// <summary>
        /// Ссылка на корневое условие фильтрации в дереве условий для шаблона
        /// </summary>
        public CompareLogicDTO Filtering { get; set; }

        /// <summary>
        /// Ссылка на корневое условие валидации в дереве условий для шаблона
        /// </summary>
        public CompareLogicDTO Validation { get; set; }

        /// <summary>
        /// Таблица, в которую будут загружаться данные из файла
        /// </summary>
        public AdmObjectDTO AdmObject { get; set; }

        /// <summary>
        /// Шаблон - источник данных
        /// </summary>
        public Guid? id_DataSource { get; set; }

        /// <summary>
        /// Тип шаблона
        /// </summary>
        public string id_TemplateType { get; set; }

        /// <summary>
        /// Название процедуры, выполняемой при редактировании через шаблон
        /// </summary>
        public string ProcedureManager { get; set; }

        /// <summary>
        /// Массовые операции
        /// </summary>
        public IEnumerable<MassOperationDTO> MassOperations { get; set; }

        /// <summary>
        /// Массовые операции без выбора строк
        /// </summary>
        public IEnumerable<MassOperationDTO> MassOperationsNoSelection { get; set; }

        /// <summary>
        /// Признак использования как подшаблона
        /// </summary>
        public bool IsSubquery { get; set; }

        /// <summary>
        /// Признак использования как подшаблона
        /// </summary>
        public bool IsLogChanges { get; set; }

        /// <summary>
        /// Шаблон-справочник для параметра шаблона
        /// </summary>
        public IEnumerable<TemplateDTO> CatalogTemplateForParameters { get; set; }

        /// <summary>
        /// Шаблон-справочник для поля шаблона
        /// </summary>
        public IEnumerable<TemplateDTO> CatalogTemplateForFields { get; set; }

        /// <summary>
        /// Шаблон для загрузки для шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> UploadTemplateForTemplates { get; set; }

        /// <summary>
        /// Шаблон параметров массовых операций для шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> MassOperationParamTemplateForTemplates { get; set; }

        /// <summary>
        /// Шаблон-подзапрос для шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> SubQueryTemplateForTemplates { get; set; }

        /// <summary>
        /// Шаблон - источник данных для пользовательских шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> DataSourceForUserTemplates { get; set; }

        /// <summary>
        /// Ссылки в таблицах
        /// </summary>
        public IEnumerable<AdmObjectFieldDTO> TableReferences { get; set; }
    }
}
