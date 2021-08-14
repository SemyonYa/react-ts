using System;

namespace SUEK.WebPlatform.DataServices.Models.DTO
{
    /// <summary>
    ///     Поле типа загружаемого файла
    /// </summary>
    [Reinforced.Typings.Attributes.TsClass(Namespace = "Models.DTO.Data")]
    public class TemplateFieldDTO
    {
        
        public Guid? Id { get; set; }

        
        public int? ColNumber { get; set; }

        
        public string Name { get; set; }

        
        public string Note { get; set; }

        
        public ConditionObjectDTO ConditionObject { get; set; }

        
        public AdmObjectFieldDTO AdmObjectField { get; set; }

        
        public bool Hidden { get; set; }

        
        public bool IsRemovedFromResultSet { get; set; }

        
        public string OrderType { get; set; }

        
        public string Type { get; set; }

        
        public string SystemType { get; set; }

        
        public Guid? id_TemplateKeyValue { get; set; }

        
        public TemplateDTO TemplateKeyValue { get; set; }

        
        public Guid? id_DataSourceTemplateField { get; set; }

        
        public bool id_LookupAlg { get; set; }

        
        public string LookupAlgParameter { get; set; }

        
        public CompareLogicDTO TemplateKeyValueLogic { get; set; }
    }
}