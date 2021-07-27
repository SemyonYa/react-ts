import './App.css';
import React from 'react';
// import { RouteEditor } from './components/RouteEditor';
import { RoutePartDTO } from './models/RoutePartDTO';
import { RouteParameterDTO } from './models/RouteParameterDTO';
// import { ExpressionBuilder } from './components/ExpressionBuilder';
import { Fake } from './models/Fake';
// import { AdminTemplate } from './components/AdminTemplate';
import { ILayoutProps } from './models/ILayoutProps';
import { MenuStore } from './models/MenuStore';
// import { RouteViewer } from './components/RouteViewer';
import { MainMenu } from './components/MainMenu';
import { APPLICATION_CONTEXT, IApplicationContext } from './context/IApplicationContext';
import { MainMenuEditor } from './components/MainMenuEditor';
import { RouteViewer } from './components/RouteViewer';
import { MenuEditor } from './components/MenuEditor';

interface IAppState {
  expression: string;
  pageNumber: number;
}

export class App extends React.PureComponent<{}, IAppState> {
  private applicationContext: IApplicationContext;
  fake: Fake;
  constructor(props: any) {
    super(props);
    this.applicationContext = {
      user: null,
      lastError: null,
      contextController: {
        setError: () => { } /* this.setError */
      },
      changePage: (id: any, parameters: any) => {
        console.log(id, parameters);
      }, /* this.beginLoadingPageId */
      displayLoadingScreen: () => { console.log('displayLoadingScreen'); },
      hideLoadingScreen: () => { console.log('hideLoadingScreen'); }
    }
    // this.fake = new Fake();
    // this.state = {
    //   expression: '( 1 + age ) > 34',
    //   pageNumber: 1
    // };
  }

  render() {

    // MAIN MENU
    return (
      React.createElement(APPLICATION_CONTEXT.Provider, { value: this.applicationContext },
        React.createElement(MenuEditor)
        // React.createElement(RouteViewer, { sectionComponentConfiguration: {} })
        // React.createElement(MainMenuEditor, {})
      )
    );

    // // ADMIN TEMPLATE
    // return React.createElement(AdminTemplate, this._layoutProps,

    //   // ROUTE EDITOR
    //   React.createElement('h1', {}, 'RouteEditor'),
    //   React.createElement(RouteEditor, {
    //     route: this._fakes,
    //     onChange: this.onRouteChange.bind(this),
    //   }),

    //   // EXPRESSION BUILDER
    //   React.createElement('h1', {}, 'Expression Builder'),
    //   React.createElement(ExpressionBuilder, { expression: this.state.expression, viewModel: this.fake, onExpressionChanged: this.onExpressionChanged.bind(this), }),
    //   React.createElement('div', {}, this.state.expression),

    //   // ROUTE VIEW
    //   React.createElement(RouteViewer, { sectionComponentConfiguration: null })
    //   // React.createElement(Pagination, { onChange: this.changePage, pageQty: 10, pageNumber: this.state.pageNumber })
    // );


    // return React.createElement('div', { className: 'wrapper' },
    //   // ROUTE EDITOR
    //   React.createElement('h1', {}, 'RouteEditor'),
    //   React.createElement(RouteEditor, {
    //     route: this._fakes,
    //     onChange: this.onRouteChange.bind(this),
    //   }),

    //   // EXPRESSION BUILDER
    //   React.createElement('h1', {}, 'Expression Builder'),
    //   React.createElement(ExpressionBuilder, { expression: this.state.expression, viewModel: this.fake, onExpressionChanged: this.onExpressionChanged.bind(this), }),
    //   React.createElement('div', {}, this.state.expression)
    // );
  }

  // ROUTE VIEW
  // changePage = (page: number) => {
  //   this.setState({ pageNumber: page })
  // }

  // ADMIN TEMPLATE
  get _layoutProps(): ILayoutProps {
    return { pageId: 123, menuStore: new MenuStore('#') };
  }

  // ROUTE EDITOR
  get _fakes(): RoutePartDTO {
    return {
      name: 'qwe',
      parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
      childRoutPart: {
        name: 'rty',
        parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
        childRoutPart: {
          name: 'tuy',
          parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
        } as RoutePartDTO,
      } as RoutePartDTO,
    } as RoutePartDTO;
  }

  onRouteChange(parts: RoutePartDTO) {
    console.log(parts);
  }


  // EXPRESSION BUILDER
  onExpressionChanged(expression: string) {
    this.setState({ expression });
  }
}