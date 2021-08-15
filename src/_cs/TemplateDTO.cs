using System;
using System.Collections.Generic;

namespace SUEK.WebPlatform.DataServices.Models.DTO
{
    /// <summary>
    /// Шаблон
    /// </summary>
    [Reinforced.Typings.Attributes.TsClass(Namespace = "Models.DTO")]
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
        public Guid? UploadTemplateId { get; set; }

        /// <summary>
        /// Шаблон для загрузки (родительский тип)
        /// </summary>
        public TemplateDTO UploadTemplate { get; set; }

        /// <summary>
        /// Номер колонки с которой начинается таблица в Excel-файле. Нумерация начинается с 1
        /// </summary>
        public int? X_pos { get; set; }

        /// <summary>
        /// Номер строки с которой начинается таблица в Excel-файле. Нумерация начинается с 1
        /// </summary>
        public int? Y_pos { get; set; }

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
        public IEnumerable<TemplateFieldDTO> Fields { get; set; } = Array.Empty<TemplateFieldDTO>();

        /// <summary>
        /// Условные объекты
        /// </summary>
        public IEnumerable<ConditionObjectDTO> ConditionObjects { get; set; } = Array.Empty<ConditionObjectDTO>();

        /// <summary>
        /// Параметры собираемого по шаблону SQL-запроса
        /// </summary>
        public IEnumerable<ConditionParameterDTO> ConditionParameters { get; set; } = Array.Empty<ConditionParameterDTO>();

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
        public AdmObjectDTO Adm_Object { get; set; }

        /// <summary>
        /// Шаблон - источник данных
        /// </summary>
        public Guid? DataSourceId { get; set; }

        /// <summary>
        /// Тип шаблона
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Название процедуры, выполняемой при редактировании через шаблон
        /// </summary>
        public string ProcedureManager { get; set; }

        /// <summary>
        /// Массовые операции
        /// </summary>
        public IEnumerable<MassOperationDTO> MassOperations { get; set; } = Array.Empty<MassOperationDTO>();

        /// <summary>
        /// Массовые операции без выбора строк
        /// </summary>
        public IEnumerable<MassOperationDTO> MassOperationsNoSelection { get; set; } = Array.Empty<MassOperationDTO>();

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
        public IEnumerable<TemplateDTO> CatalogTemplateForParameters { get; set; } = Array.Empty<TemplateDTO>();

        /// <summary>
        /// Шаблон-справочник для поля шаблона
        /// </summary>
        public IEnumerable<TemplateDTO> CatalogTemplateForFields { get; set; } = Array.Empty<TemplateDTO>();

        /// <summary>
        /// Шаблон для загрузки для шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> UploadTemplateForTemplates { get; set; } = Array.Empty<TemplateDTO>();

        /// <summary>
        /// Шаблон параметров массовых операций для шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> MassOperationParamTemplateForTemplates { get; set; } = Array.Empty<TemplateDTO>();

        /// <summary>
        /// Шаблон-подзапрос для шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> SubQueryTemplateForTemplates { get; set; } = Array.Empty<TemplateDTO>();

        /// <summary>
        /// Шаблон - источник данных для пользовательских шаблонов
        /// </summary>
        public IEnumerable<TemplateDTO> DataSourceForUserTemplates { get; set; } = Array.Empty<TemplateDTO>();

        /// <summary>
        /// Ссылки в таблицах
        /// </summary>
        public IEnumerable<AdmObjectFieldDTO> TableReferences { get; set; } = Array.Empty<AdmObjectFieldDTO>();
    }
}
