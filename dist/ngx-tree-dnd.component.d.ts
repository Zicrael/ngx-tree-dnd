import { OnInit, EventEmitter } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel } from './tree-view.model';
import { FormBuilder } from '@angular/forms';
import { NgxTreeChildrenComponent } from './ngx-tree-dnd-children.component';
export declare class NgxTreeComponent implements OnInit {
    treeService: NgxTreeService;
    private fb;
    treeView: TreeModel;
    type: string;
    child: NgxTreeChildrenComponent;
    ondragstart: EventEmitter<any>;
    ondrop: EventEmitter<any>;
    onallowdrop: EventEmitter<any>;
    onadditem: EventEmitter<any>;
    onrenameitem: EventEmitter<any>;
    onremoveitem: EventEmitter<any>;
    constructor(treeService: NgxTreeService, fb: FormBuilder);
    treeData: TreeModel[];
    enableSubscribers(): void;
    getTreeData(userTree: any): void;
    addRootItem(): void;
    onDrop(event: any, item: any): void;
    onDragStart(event: any): void;
    onDropChild(event: any): void;
    ngOnInit(): void;
}
