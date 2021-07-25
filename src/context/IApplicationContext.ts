import * as React from 'react';
import { IApplicationContextController } from './IApplicationContextController';

export interface IApplicationContext {
    user: any;
    // user: User;
    lastError: Error;
    changePage(id: any, parameters: any): void;
    displayLoadingScreen(): void;
    hideLoadingScreen(): void;
    contextController: IApplicationContextController;
}

export const APPLICATION_CONTEXT = React.createContext<IApplicationContext>(null);