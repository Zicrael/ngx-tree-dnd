/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */

// Main tree model
export interface TreeModel {
    name: string;
    id: number;
    options?: TreeItemOptions;
    childrens: TreeModel[];
}

// Tree items options model
export interface TreeItemOptions {
    href?: string;
    isHidden?: boolean;
    currentlyDragging?: boolean;
}

// Tree config model
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
