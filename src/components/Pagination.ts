import React from 'react';

interface IPaginationProps {
    pageQty: number;
    pageNumber: number;
    onChange(page: number): void;
}

export class Pagination extends React.PureComponent<IPaginationProps> {

    private onChange = (page: number) => {
        if (this.props.pageNumber !== page) {
            this.props.onChange(page);
        }
    }

    render() {
        let pages: number[] = Array(this.props.pageQty).fill(0).map((_, i) => i + 1);
        return (
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                ...React.Children.toArray(pages.map(page =>
                    React.createElement(Page, { page, isActive: page === this.props.pageNumber, onClick: this.onChange })
                ))
            )
        );
    }
}

///
/// PAGE
///

interface IPageProps {
    page: number;
    isActive: boolean;
    onClick(page: number): void;
}

class Page extends React.Component<IPageProps> {
    render() {
        return (
            this.props.isActive
                ? React.createElement('span', { style: { fontWeight: '800' } }, this.props.page)
                : React.createElement('a', { onClick: () => this.props.onClick(this.props.page), style: { fontWeight: '400', cursor: 'pointer' } }, this.props.page)
        );
    }
}