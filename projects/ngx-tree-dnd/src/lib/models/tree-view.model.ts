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
    hidden?: boolean;
    hideChildrens?: boolean;
    draggable?: boolean;
    position?: number;
    edit?: boolean;
    disabled?: boolean;
    // buttons
    showDropChildZone?: boolean;
    showActionButtons?: boolean;
    showDeleteButton?: boolean;
    showExpandButton?: boolean;
    // settings for component (it`s not for user);
    currentlyDragging?: boolean;
    destenationTop?: boolean;
    destenationBottom?: boolean;
}

// Tree config model
export interface TreeConfig {
    // buttons
    showActionButtons?: boolean;
    showAddButtons?: boolean;
    showRenameButtons?: boolean;
    showDeleteButtons?: boolean;
    enableExpandButtons?: boolean;
    showRootActionButtons?: boolean;
    // actions
    enableDragging?: boolean;
    rootTitle?: string;
    options?: TreeItemOptions;
    // validation
    validationText?: string;
    minCharacterLength?: number;
    setItemsAsLinks?: boolean;
    // size
    setFontSize?: number;
    setIconSize?: number;
}

export interface FindingResults {
    foundItem: TreeModel, itemsList: TreeModel[], parentItem?: TreeModel
}