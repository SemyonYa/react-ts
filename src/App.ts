import "./App.css";
import React from "react";
import { RouteEditor } from "./components/RouteEditor";
import { RoutePartDTO } from "./models/RoutePartDTO";
import { RouteParameterDTO } from "./models/RouteParameterDTO";
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
        route: this._fakes2,
        onChange: this.onRouteChange.bind(this),
      }),

      // Expression Builder
      React.createElement("h1", {}, "Expression Builder"),
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
      let route = {
        name: i,
        parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
      } as RoutePartDTO;
      return route;
    });
  }

  get _fakes2(): RoutePartDTO {
    return {
      name: "qwe",
      parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
      childRoutPart: {
        name: "rty",
        parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
        childRoutPart: {
          name: "tuy",
          parameter: {
            isMandatory: true,
            parameterType: 0,
          } as RouteParameterDTO,
        } as RoutePartDTO,
      } as RoutePartDTO,
    } as RoutePartDTO;
  }

  onRouteChange(parts: RoutePartDTO) {
    console.log(parts);
    // console.log(
    //   ...parts.map((p) => {
    //     return [p.name, p.parameter?.parameterType, p.parameter?.isMandatory];
    //   })
    // );
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
