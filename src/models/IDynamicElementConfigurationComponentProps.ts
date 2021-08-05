export interface IDynamicElementConfigurationComponentProps {
    valuePath: string;
    settings: { [key: string]: string };
    onSettingChanged(key: string, modelBasedExpression: string): void;
}