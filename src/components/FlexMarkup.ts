import React from "react";

export enum Alignment {
    Start,
    End,
    Center,
    Stretch,
    SpaceAround,
    SpaceBetween,
    SpaceEvenly
}

export enum Direction {
    Row,
    Column
}


interface IFlexMarkupProps {
    direction?: Direction;
    alignment?: Alignment;
}

export class FlexMarkup extends React.Component<IFlexMarkupProps> {
    private alignment: any = {
        [Alignment.Start]: 'flex-start',
        [Alignment.End]: 'flex-end',
        [Alignment.Center]: 'center',
        [Alignment.Stretch]: 'stretch',
        [Alignment.SpaceAround]: 'space-around',
        [Alignment.SpaceBetween]: 'space-between',
        [Alignment.SpaceEvenly]: 'space-evenly'
    };

    private direction: any = {
        [Direction.Row]: 'row',
        [Direction.Column]: 'column',
    }

    render() {
        return (
            React.createElement(
                'div',
                {
                    style: {
                        display: 'flex',
                        flexDirection: this.direction[this.props.direction] ?? this.direction[Direction.Row],
                        justifyContent: this.alignment[this.props.alignment] ?? this.alignment[Alignment.Start],
                        width: '100%'
                    }
                },
                this.props.children
            )
        );
    }
}