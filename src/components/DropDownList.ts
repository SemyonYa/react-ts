import * as React from 'react';
import { APPLICATION_CONTEXT, IApplicationContext } from '../context/IApplicationContext';


// TODO: set real model & store
export interface IItemModel {
    id: string;
    value: string;
}

export interface IDropDownListProps {
    isTable: boolean;
    store: { get(searchValue?: string): Promise<IItemModel[]> }
}

interface IDropDownListState {
    shown: boolean;
    items: IItemModel[];
    searchValue: string;
}

export class DropDownList extends React.Component<IDropDownListProps, IDropDownListState> {
    currentTimeout: any;

    private onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Escape') this.hide();
    }

    private onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue: string = e.target.value;
        this.setState({
            searchValue: currentValue
        });
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
            this.fetch(currentValue)
        }, 500);
    }

    private onSelect = (item: IItemModel) => {
        this.setState({ searchValue: item.value, shown: false });
    }

    private fetch = (searchValue: string) => {
        const context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        this.props.store.get(searchValue)
            .then(
                items => {
                    this.setState({ items, shown: true });
                    context.hideLoadingScreen();
                }
            )
            .catch(context.contextController.setError);
    }

    private hide = () => {
        this.setState({ shown: false });
    }

    private onBlur = () => {
        setTimeout(this.hide, 200);
    }

    constructor(props: IDropDownListProps) {
        super(props);
        this.state = {
            shown: false,
            items: [],
            searchValue: ''
        }
    }
    render() {
        return (
            React.createElement('div', { role: 'combobox', style: { display: 'flex', flexDirection: 'column' } },
                React.createElement(
                    'input', {
                    value: this.state.searchValue,
                    onChange: this.onSearchChanged,
                    onKeyDown: this.onSearchKeyDown,
                    onFocus: this.onSearchChanged,
                    onBlur: this.onBlur
                }),
                this.state.shown
                    ? React.createElement('div', { style: { height: '0px', zIndex: 1, backgroundColor: 'white' } },
                        React.createElement('div', { style: { maxHeight: '200px', backgroundColor: 'white', overflowY: 'auto' } },
                            this.state.items.length > 0
                                ? React.Children.toArray(this.state.items.map(item =>
                                    React.createElement(Item, { onSelect: this.onSelect, item })
                                ))
                                : 'Список пуст'
                        )
                    )
                    : null
            )
        );
    }
}

DropDownList.contextType = APPLICATION_CONTEXT;

///
/// ITEM
///

interface IItemProps {
    item: IItemModel;
    onSelect(item: IItemModel): void;
}

class Item extends React.Component<IItemProps> {

    private select = () => {
        this.props.onSelect(this.props.item);
    }

    render() {
        return React.createElement('div', { onClick: this.select, role: 'option', style: { cursor: 'pointer' } }, this.props.item.value);
    }
}

