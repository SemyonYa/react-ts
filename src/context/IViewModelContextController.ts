export interface IViewModelContextController {
    updateModel(model: any): void;
    updateValue(path: string, value: any);
    executeMethod(name: string): void;
}