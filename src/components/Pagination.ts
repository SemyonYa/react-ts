import React from 'react';

interface IPaginationProps {
    pageQty: number;
    pageNumber: number;
    onChange(page: number): void;
}

export class Pagination extends React.PureComponent<IPaginationProps> {

    private onChange = (pageNumber: number) => {
        if (this.props.pageNumber !== pageNumber) {
            this.props.onChange(pageNumber);
        }
    }

    render() {
        let pages: number[] = Array(this.props.pageQty).fill(0).map((_, i) => i + 1);
        return (
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                ...React.Children.toArray(pages.map(pageNumber =>
                    React.createElement(Page, { pageNumber: pageNumber, isActive: pageNumber === this.props.pageNumber, onClick: this.onChange })
                ))
            )
        );
    }
}

///
/// PAGE
///

interface IPageProps {
    pageNumber: number;
    isActive: boolean;
    onClick(page: number): void;
}

class Page extends React.Component<IPageProps> {

    go = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.onClick(this.props.pageNumber)
    }

    render() {
        return (
            this.props.isActive
                ? React.createElement('span', { style: { fontWeight: '800' } }, this.props.pageNumber)
                : React.createElement('a', { href: '', onClick: this.go, style: { fontWeight: '400' } }, this.props.pageNumber)
        );
    }
}