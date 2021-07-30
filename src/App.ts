import './App.css';
import React from 'react';
import { RoutePartDTO } from './models/RoutePartDTO';
import { RouteParameterDTO } from './models/RouteParameterDTO';
import { Fake } from './models/Fake';
import { ILayoutProps } from './models/ILayoutProps';
import { MenuStore } from './models/MenuStore';
import { APPLICATION_CONTEXT, IApplicationContext } from './context/IApplicationContext';
import { RouteViewer2 } from './components/RouteViewer2';
import { MenusManager } from './components/MenusManager';
import { Alignment, Direction, FlexMarkup } from './components/FlexMarkup';

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
        React.createElement(FlexMarkup, { alignment: Alignment.SpaceAround, direction: Direction.Column },
          React.createElement('div', { style: { border: 'solid 1px darkred' } }, 'qwdqdgahsd'),
          React.createElement('div', { style: { border: 'solid 1px darkred' } }, 'gahsd'),
          React.createElement('div', { style: { border: 'solid 1px darkred' } }, 'lclaisdcasdbcauysdcouyasdovgahsd'),
        )
        // React.createElement(MenusManager, { baseUrl: '' })
        // React.createElement(RouteViewer2, { sectionComponentConfiguration: { baseUrl: 'qweqwe' } })
        // React.createElement(MenuEditor)
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