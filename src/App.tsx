import './App.css';
import React from 'react';
import ExpressionBuilder from './ExpressionBuilder/ExpressionBuilder';

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
      <div className="wrapper">
        <h1>Expression Builder</h1>
        <ExpressionBuilder expression={this.state.expression} viewModel={this.fake} onExpressionChanged={this.onExpressionChanged.bind(this)} />
        {/* <hr width="100%" /> */}
        <div>{this.state.expression}</div>
      </div>
    );
  }

  onExpressionChanged(expression: string) {
    this.setState({
      expression
    });
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
