import React from "react";
import { TreeView, TreeViewExpandChangeEvent, TreeViewItemClickEvent } from "@progress/kendo-react-treeview";


export function PageEditor() {
    let currentEditingNode;
    const tree = [
        {
            text: "Furniture",
            expanded: true,
            items: [
                {
                    text: "Tables & Chairs",
                },
                {
                    text: "Sofas",
                },
                {
                    text: "Occasional Furniture",
                },
            ],
        },
        {
            text: "Decor",
            items: [
                {
                    text: "Bed Linen",
                },
                {
                    text: "Curtains & Blinds",
                },
                {
                    text: "Carpets",
                },
            ],
        },
    ];


    // TODO: type
    const onSelectItem = (e) => {
        console.log(e);
    }

    const addItemToTree = ({ item, parentId }) => {
        console.log(item, parentId);
    }

    const onItemClick = (e) => {
        console.log(e);
    }

    const onItemDragOver = (e) => {
        console.log(e);
    }
    const onItemDragEnd = (e) => {
        console.log(e);
    }

    return <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 1 300px', borderRight: 'solid 1px red' }}>
            <select onChange={onSelectItem}>
                {React.Children.map([1, 2, 3, 4], item =>
                    <option value={item}>Option #{item}</option>
                )}
            </select>
            <TreeView
                data={tree}
                draggable={true}
                onItemClick={onItemClick}
                onItemDragOver={onItemDragOver}
                onItemDragEnd={onItemDragEnd}
            ></TreeView>
        </div>
        <div style={{ flex: '0 1 100%' }}>

        </div>
    </div>;
}