import "./App.css";
import React from "react";
import { RouteEditor } from "./RouteEditor/RouteEditor";
import { RoutePartDTO } from "./RouteEditor/RoutePartDTO";
import { RouteParameterDTO } from "./RouteEditor/RouteParameterDTO";
import { ExpressionBuilder } from "./components/ExpressionBuilder";

interface IAppState {
  expression: string;
}

class App extends React.PureComponent<{}, IAppState> {
  fake: Fake;
  constructor(props: any) {
    super(props);
    this.fake = new Fake();
    this.state = {
      expression: "( 1 + age ) > 34",
    };
  }

  render() {
    return React.createElement(
      "div",
      { className: "wrapper" },
      // Route Editor
      React.createElement("h1", {}, "RouteEditor"),
      React.createElement(RouteEditor, {
        parts: this._fakes,
        onChange: this.onRouteChange.bind(this),
      }),

      // Expression Builder
      React.createElement("h1", {}, "Expression Builder2"),
      React.createElement(ExpressionBuilder, {
        expression: this.state.expression,
        viewModel: this.fake,
        onExpressionChanged: this.onExpressionChanged.bind(this),
      }),
      React.createElement("div", {}, this.state.expression)
    );
  }

  onExpressionChanged(expression: string) {
    this.setState({
      expression,
    });
  }

  // ROUTE EDITOR
  get _fakes(): RoutePartDTO[] {
    return ["qwe", "rty", "uio"].map((i) => {
      let route = <RoutePartDTO>{
        name: i,
        parameter: <RouteParameterDTO>{ isMandatory: true, parameterType: 0 },
      };
      return route;
    });
  }
  get _fakes2(): RoutePartDTO {
    return <RoutePartDTO>{
      name: "qwe",
      parameter: <RouteParameterDTO>{ isMandatory: true, parameterType: 0 },
      childRoutPart: <RoutePartDTO>{
        name: "rty",
        parameter: <RouteParameterDTO>{ isMandatory: true, parameterType: 0 },
        childRoutPart: <RoutePartDTO>{
          name: "tuy",
          parameter: <RouteParameterDTO>{ isMandatory: true, parameterType: 0 },
        },
      },
    };
  }

  onRouteChange(parts: RoutePartDTO[]) {
    console.log(parts);
    console.log(
      ...parts.map((p) => {
        return [p.name, p.parameter?.parameterType, p.parameter?.isMandatory];
      })
    );
  }
}

export class Fake {
  id: string;
  name: string;
  age: string;
  constructor() {
    this.id = "";
    this.name = "name";
    this.age = "age";
  }
}

export default App;
