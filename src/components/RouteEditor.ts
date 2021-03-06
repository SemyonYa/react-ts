import React, { ChangeEvent } from 'react';
import { RouteParameterDTO } from '../models/RouteParameterDTO';
import { RoutePartDTO } from '../models/RoutePartDTO';

///
/// EDITOR
///

interface IRouteEditorProps {
  route: RoutePartDTO;
  onChange(route: RoutePartDTO): void;
}

export class RouteEditor extends React.PureComponent<IRouteEditorProps> {
  parts: RoutePartDTO[] = [];
  constructor(props: IRouteEditorProps) {
    super(props);
    this.treeToArray(props.route);
  }

  render() {
    return (
      React.createElement('div', { style: { display: 'flex' } },
        ...React.Children.toArray(this.parts.map((part) =>
          [
            React.createElement(RoutePart, { part, onChange: this.onRoutePartChange }),
            React.createElement('span', { style: { margin: '0 .5rem' } }, '/'),
          ]
        ))
      )
    );
  }

  private onRoutePartChange = () => {
    this.props.onChange(this.props.route);
  }

  private treeToArray(part: RoutePartDTO): void {
    this.parts.push(part);
    if (part.childRoutPart) this.treeToArray(part.childRoutPart);
  }
}

///
/// Route part
///

interface IRoutePartProps {
  part: RoutePartDTO;
  onChange(): void;
}

interface IRoutePartState {
  isEditable: boolean;
  partName: string;
  isParam: boolean;
  paramType: number;
  isParamRequired: boolean;
}

class RoutePart extends React.PureComponent<IRoutePartProps, IRoutePartState> {
  constructor(props: IRoutePartProps) {
    super(props);
    this.state = {
      isEditable: false,
      partName: null,
      isParam: null,
      isParamRequired: null,
      paramType: null
    };
  }

  render() {
    return React.createElement('div', {},
      this.state.isEditable ?
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
          React.createElement('div', {},
            React.createElement('input', { onChange: this.changePartName, value: this.state.partName ?? this.props.part.name }),
            React.createElement('span', { onClick: this.toggleEditable }, 'v')
          ),
          React.createElement('div', {},
            React.createElement('label', {},
              React.createElement('input', { type: 'checkbox', onChange: this.changeIsParam, checked: this.state.isParam ?? this.props.part.parameter !== undefined }),
              'is param'
            )
          ),
          this.state.isParam ?? this.props.part.parameter !== undefined ?
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
              'PARAM',
              React.createElement('input', { type: 'number', onChange: this.changeParamType, value: this.state.paramType ?? this.props.part.parameter!.parameterType, }),
              React.createElement('label', {},
                React.createElement('input', { type: 'checkbox', onChange: this.changeIsParamRequired, checked: this.state.isParamRequired ?? this.props.part.parameter!.isMandatory }),
                'is required'
              )
            ) : null
        )
        : React.createElement('span', { onClick: this.toggleEditable }, this.props.part.name)
    );
  }

  toggleEditable = () => {
    this.setState({ isEditable: !this.state.isEditable });
  }

  changePartName = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    this.setState({ partName: currentValue });
    this.props.part.name = currentValue;
    this.props.onChange();
  }

  changeIsParam = (e: ChangeEvent<HTMLInputElement>) => {
    const currentState: boolean = e.target.checked;
    this.setState({ isParam: currentState });
    this.props.part.parameter = currentState ? ({ isMandatory: true, parameterType: 0 } as RouteParameterDTO) : undefined;
    this.props.onChange();
  }

  changeParamType = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = +e.target.value;
    this.setState({ paramType: currentValue });
    this.props.part.parameter!.parameterType = currentValue;
    this.props.onChange();
  }

  changeIsParamRequired = (e: ChangeEvent<HTMLInputElement>) => {
    const currentState: boolean = e.target.checked;
    this.setState({ isParamRequired: currentState });
    this.props.part.parameter!.isMandatory = currentState;
    this.props.onChange();
  }
}
