import React from 'react';
import ExpressionBuilder from './ExpressionBuilder/ExpressionBuilder';
import './App.css';

class App extends React.Component {
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

export default App;


export class Fake {
  id: string;
  name: string;
  age: string;
  // id: string, name: string, age: string
  constructor() {
    this.id = '';
    this.name = 'name';
    this.age = 'age';
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
