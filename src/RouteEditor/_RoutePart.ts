import React, { ChangeEvent } from 'react';
import { RouteParameterDTO } from './RouteParameterDTO';
import { RoutePartDTO } from './RoutePartDTO';

interface IRoutePartProps {
    part: RoutePartDTO;
}

interface IRoutePartState {
    isEditable: boolean;
    partName?: string;
    isParam?: boolean,
    paramType?: number;
    isParamRequired?: boolean,
}

export class RoutePart extends React.PureComponent<IRoutePartProps, IRoutePartState> {
    constructor(props: IRoutePartProps) {
        super(props);
        this.state = {
            isEditable: false,
            partName: undefined,
            isParam: undefined,
            isParamRequired: undefined,
        };
    }

    render() {
        return React.createElement('div', {},
            this.state.isEditable
                ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement('div', {},
                        React.createElement('input', { onChange: this.changePartName.bind(this), value: this.state.partName ?? this.props.part.name }),
                        React.createElement('span', { onClick: this.toggleEditable.bind(this), style: { cursor: 'pointer' } }, 'x')
                    ),
                    React.createElement('div', {},
                        React.createElement('label', {},
                            React.createElement('input', { type: 'checkbox', onChange: this.changeIsParam.bind(this), checked: this.state.isParam ?? this.props.part.parameter !== undefined }),
                            'is param'
                        ),
                    ),
                    this.state.isParam ?? this.props.part.parameter !== undefined ?
                        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: 'solid 1px #efefef', borderRadius: '4px' } },
                            'PARAM',
                            React.createElement('input', { type: 'number', onChange: this.changeParamType.bind(this), value: this.state.paramType ?? this.props.part.parameter!.parameterType }),
                            React.createElement('label', {},
                                React.createElement('input', { type: 'checkbox', onChange: this.changeIsParamRequired.bind(this), checked: this.state.isParamRequired ?? this.props.part.parameter!.isMandatory }),
                                'isRequired'
                            ),
                        ) : null,
                )
                : React.createElement('span', { onClick: this.toggleEditable.bind(this) }, this.props.part.name)
        );
    }

    toggleEditable() {
        this.setState({ isEditable: !this.state.isEditable });
    }

    changePartName(e: ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;
        this.setState({ partName: currentValue });
        this.props.part.name = currentValue;
    }

    changeIsParam(e: ChangeEvent<HTMLInputElement>) {
        const currentState: boolean = e.target.checked;
        this.setState({ isParam: currentState });
        this.props.part.parameter = currentState ? new RouteParameterDTO() : undefined;
    }

    changeParamType(e: ChangeEvent<HTMLInputElement>) {
        const currentValue = +e.target.value;
        this.setState({ paramType: currentValue });
        this.props.part.parameter!.parameterType = currentValue;
    }

    changeIsParamRequired(e: ChangeEvent<HTMLInputElement>) {
        const currentState: boolean = e.target.checked;
        this.setState({ isParamRequired: currentState });
        this.props.part.parameter!.isMandatory = currentState;
    }
}
