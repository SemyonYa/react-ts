import './App.css';
import React from 'react';
import { RouteEditor } from './components/RouteEditor';
import { RoutePartDTO } from './models/RoutePartDTO';
import { RouteParameterDTO } from './models/RouteParameterDTO';
import { ExpressionBuilder } from './components/ExpressionBuilder';
import { Fake } from './models/Fake';
import { AdminTemplate } from './_AdminTemplate/AdminTemplate';
import { ILayoutProps } from './_AdminTemplate/ILayoutProps';
import { MenuStore } from './_AdminTemplate/MenuStore';

interface IAppState {
  expression: string;
}

export class App extends React.PureComponent<{}, IAppState> {
  fake: Fake;
  constructor(props: any) {
    super(props);
    this.fake = new Fake();
    this.state = {
      expression: '( 1 + age ) > 34',
    };
  }

  render() {
    return React.createElement(AdminTemplate, this._layoutProps);
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