import './App.css';
import React from 'react';
import ExpressionBuilder from './ExpressionBuilder/ExpressionBuilder';
import { RouteEditor } from './RouteEditor/RouteEditor';
import { RoutePartDTO } from './RouteEditor/RoutePartDTO';
import { RouteParameterDTO } from './RouteEditor/RouteParameterDTO';

interface IAppState {
  expression: string;
}

class App extends React.PureComponent<{}, IAppState> {
  fake: Fake;
  constructor(props: any) {
    super(props)
    this.fake = new Fake();
    this.state = {
      expression: '( 1 + age ) > 34'
    };
  }

  render() {
    return (
      React.createElement('div', { className: 'wrapper' },
        // React.createElement('h1', {}, 'Expression Builder'),
        // React.createElement(ExpressionBuilder, { expression: this.state.expression, viewModel: this.fake, onExpressionChanged: this.onExpressionChanged.bind(this) },),
        // React.createElement('div', {}, this.state.expression),
        // React.createElement('hr', {}),
        React.createElement('h1', {}, 'RouteEditor'),
        React.createElement(RouteEditor, {parts: this._fakes}),
      )
    );
    // return (
    //   <div className="wrapper">
    //     <h1>Expression Builder</h1>
    //     <ExpressionBuilder expression={this.state.expression} viewModel={this.fake} onExpressionChanged={this.onExpressionChanged.bind(this)} />
    //     {/* <hr width="100%" /> */}
    //     <div>{this.state.expression}</div>
    //   </div>
    // );
  }

  onExpressionChanged(expression: string) {
    this.setState({
      expression
    });
  }

  // ROUTE EDITOR
  get _fakes(): RoutePartDTO[] {
    return ['qwe', 'rty', 'uio'].map(i =>
        new RoutePartDTO(
            i,
            new RouteParameterDTO(),
        )
    );
}



}

export class Fake {
  id: string;
  name: string;
  age: string;
  constructor() {
    this.id = '';
    this.name = 'name';
    this.age = 'age';
  }
}

export default App;
