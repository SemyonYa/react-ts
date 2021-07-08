import React, { ChangeEvent } from 'react';
import { RoutePartDTO } from './RoutePartDTO';

interface IRoutePartProps {
  part: RoutePartDTO;
}

interface IRoutePartState {
  isEditable: boolean;
  value?: string;
  isRequired?: boolean,
}

export class RoutePart extends React.PureComponent<IRoutePartProps,IRoutePartState> {
  constructor(props: IRoutePartProps) {
    super(props);
    this.state = {
      isEditable: false,
      value: undefined,
      isRequired: undefined,
    };
  }

  render() {
    return React.createElement('div', {},
      this.state.isEditable
        ? React.createElement('div', {style: {display: 'flex', flexDirection: 'column'}},
            React.createElement('div', {},
                React.createElement('input', { onChange: this.changeValue.bind(this), value: this.state.value ?? this.props.part.name }),
                React.createElement('span', {onClick: this.toggleEditable.bind(this), style: {cursor: 'pointer'}}, 'x')
            ),
            React.createElement('div', {},
                React.createElement('label', {}, 
                        React.createElement('input', {type: 'checkbox', onChange: this.changeIsRequired.bind(this), checked: this.state.isRequired ?? this.props.part.parameter.isMandatory }),
                        'isRequired'
                    ),
            )
        )
        : React.createElement('span', { onClick: this.toggleEditable.bind(this)}, this.props.part.name)
    );
  }

  toggleEditable() {
    this.setState({ isEditable: !this.state.isEditable });
  }

  changeValue(e: ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.value;
    this.setState({value: currentValue});
    this.props.part.name = currentValue;
  }

  changeIsRequired(e: ChangeEvent<HTMLInputElement>) {
    const currentState = e.target.checked;
    this.setState({isRequired: currentState});
    this.props.part.parameter.isMandatory = currentState;
  }
}
