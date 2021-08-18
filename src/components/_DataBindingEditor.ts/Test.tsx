import React from "react";
import * as ReactDOM from 'react-dom';
import {
    Filter,
    Operators,
    TextFilter,
    NumericFilter,
    DateFilter,
    BooleanFilter,
    FilterChangeEvent
} from '@progress/kendo-react-data-tools';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query'

interface ITestState {
    filter: CompositeFilterDescriptor;
}

export class TestBinding extends React.Component<any, ITestState> {
    initialFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [
            { field: 'UnitPrice', operator: 'gt', value: 20 },
            { field: 'UnitPrice', operator: 'lt', value: 50 },
            { field: 'Discontinued', operator: 'eq', value: false },
            { field: 'FirstOrderedOn', operator: 'lt', value: new Date(2000, 1, 1) },
            {
                logic: 'or',
                filters: [
                    { field: 'ProductName', operator: 'contains', value: 'organic' },
                    { field: 'ProductName', operator: 'contains', value: 'cranberry' }
                ]
            }
        ]
    } as CompositeFilterDescriptor;
    state = {
        filter: this.initialFilter
    };

    onFilterChange = (event: FilterChangeEvent) => {
        this.setState({ filter: event.filter });
    }
    render() {
        return (
            <Filter
                value={this.state.filter}
                onChange={this.onFilterChange}
                fields={[
                    { name: "ProductName", label: 'Name', filter: TextFilter, operators: Operators.text },
                    { name: "UnitPrice", label: 'Price', filter: NumericFilter, operators: Operators.numeric },
                    { name: "Discontinued", label: 'Discontinued', filter: BooleanFilter, operators: Operators.boolean },
                    { name: "FirstOrderedOn", label: "First Ordered", filter: DateFilter, operators: Operators.date }
                ]}
            />
        );
    }
}