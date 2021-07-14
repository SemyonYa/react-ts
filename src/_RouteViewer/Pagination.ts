import React from "react";

interface IPaginationProps {
    pageQty: number;
    pageNumber: number;
    onChange(page: number): void;
}

export class Pagination extends React.PureComponent<IPaginationProps> {

    render() {
        console.log(this.props);

        let pages: number[] = Array(this.props.pageQty).fill(0).map((_, i) => i + 1);
        return (
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                ...React.Children.toArray(pages.map(p =>
                    React.createElement(
                        'span',
                        {
                            onClick: () => this.onChange(p),
                            style: {
                                fontWeight: p === this.props.pageNumber ? '800' : '400',
                                fontSize: p === this.props.pageNumber ? '1.4rem' : '1rem',
                                cursor: 'pointer'
                            }
                        },
                        p
                    )
                ))
            )
        );
    }

    private onChange = (page: number) => {
        if (this.props.pageNumber !== page) {
            this.props.onChange(page);
        }
    }
}