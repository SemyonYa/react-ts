import * as React from 'react';
import { IViewModelContextController } from "./IViewModelContextController";

export interface IViewModelContext {
    data: any;
    getExpression(expression: string): any;
    getValue(valuePath: string): any;
    contextController: IViewModelContextController;
}

export const VIEW_MODEL_CONTEXT = React.createContext<IViewModelContext>(null);