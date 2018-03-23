export interface TreeModel {
    name: string;
    id: number;
    childrens: TreeModel[];
}
export interface TreeConfig {
    showAddRootBtn: boolean;
    showItemActionBtns: boolean;
    showAddItemButton: boolean;
    showRenameButton: boolean;
    showDeleteButton: boolean;
    enableShowHideBtns: boolean;
    enableDragging: boolean;
    setRootTitle: string;
    setErrorValidationText: string;
    setMinValidationCountChars: number;
}
