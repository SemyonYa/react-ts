import { DynamicElementConfigurationDTO } from "./DynamicElementConfigurationDTO";

export interface IDynamicElementProps {
    value: any;
    onValueChange(newValue: any): void;
    settings: { [key: string]: string };
    childrenConfigurations: DynamicElementConfigurationDTO[];
}