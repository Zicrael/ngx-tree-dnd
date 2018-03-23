import { OnInit } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel } from './tree-view.model';
import { FormGroup, FormBuilder } from '@angular/forms';
export declare class NgxTreeChildrenComponent implements OnInit {
    private treeService;
    private fb;
    _item: TreeModel;
    type: string;
    isEdit: boolean;
    errorEdit: string;
    isHidden: boolean;
    renameForm: FormGroup;
    constructor(treeService: NgxTreeService, fb: FormBuilder);
    item: TreeModel;
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
