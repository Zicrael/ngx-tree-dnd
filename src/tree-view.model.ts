/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
export interface TreeModel {
    name: string;
    id: number;
    options?: TreeItemOptions;
    childrens: TreeModel[];
}

export interface TreeItemOptions {
    href?: string;
    isHidden?: boolean;
    currentlyDragging?: boolean;
}
export interface TreeConfig {
    showAddRootBtn?: boolean;
    showItemActionBtns?: boolean;
    showAddItemButton?: boolean;
    showRenameButton?: boolean;
    showDeleteButton?: boolean;
    enableShowHideBtns?: boolean;
    enableDragging?: boolean;
    setRootTitle?: string;
    setErrorValidationText?: string;
    setMinValidationCountChars?: number;
    setTreeItemAsLinks?: boolean;
}
