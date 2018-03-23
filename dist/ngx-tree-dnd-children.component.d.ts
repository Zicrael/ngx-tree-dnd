import { OnInit } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel, TreeConfig } from './tree-view.model';
import { FormGroup, FormBuilder } from '@angular/forms';
export declare class NgxTreeChildrenComponent implements OnInit {
    private treeService;
    private fb;
    _item: TreeModel;
    type: string;
    isEdit: boolean;
    showError: boolean;
    isHidden: boolean;
    isDragable: boolean;
    renameForm: FormGroup;
    _config: TreeConfig;
    item: TreeModel;
    constructor(treeService: NgxTreeService, fb: FormBuilder);
    checkFloatItem(): void;
    createForm(): void;
    onDragStart(event: any, item: any): void;
    onDrop(event: any, item: any): void;
    allowDrop(event: any): void;
    submitAdd(name: any, type: any): void;
    submitRename(item: any): void;
    onSubmitDelete(): void;
    ngOnInit(): void;
}
