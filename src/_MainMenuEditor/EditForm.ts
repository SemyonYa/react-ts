import React from "react";
import { MenuItemDTO } from "../models/MenuItemDTO2";

interface IEditFormProps {
    model: MenuItemDTO;
    onUpdate(model: MenuItemDTO): void;
    onDelete(id: string): void;
}

interface IEditFormState {

}

export class EditForm extends React.Component<IEditFormProps, IEditFormState> {
    render() {
        return (
            React.createElement('div', {}, `Edit ${this.props.model.id}`)
        );
    }
}