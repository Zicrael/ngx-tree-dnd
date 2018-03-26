/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel, TreeConfig } from './tree-view.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Options } from 'selenium-webdriver/safari';
import { NgxTreeChildrenComponent } from './ngx-tree-dnd-children.component';

@Component({
  selector: 'ngx-tree-component',
  template: `
  <div id='three-wrapper' *ngIf="treeView">
  <div class='root-title' (drop)="onDrop($event, treeView)" (dragover)="child.allowDrop($event)">
  {{_config.setRootTitle}}
  </div>
<div class='tree-child'>
   <div class="tree-content">
       <ngx-tree-children *ngFor="let item of treeView" [item]="item"></ngx-tree-children>
   </div>
</div>
<button class='btn-add-small' *ngIf="_config.showAddRootBtn" (click)='addRootItem()'>
 <span></span>
 <span></span>
</button>
</div>
  `
})
export class NgxTreeComponent implements OnInit {
  treeView: TreeModel;
  type: string;
  _config: TreeConfig = {
      showAddRootBtn: true,
      showItemActionBtns: true,
      showAddItemButton: true,
      showRenameButton: true,
      showDeleteButton: true,
      enableShowHideBtns: true,
      enableDragging: true,
      setRootTitle: 'Root',
      setErrorValidationText: 'Enter valid name',
      setMinValidationCountChars: 1,
      setTreeItemAsLinks: false
    };
  @ViewChild(NgxTreeChildrenComponent) child: NgxTreeChildrenComponent;
  @Output() ondragstart: EventEmitter<any> = new EventEmitter();
  @Output() ondrop: EventEmitter<any> = new EventEmitter();
  @Output() onallowdrop: EventEmitter<any> = new EventEmitter();
  @Output() ondragend: EventEmitter<any> = new EventEmitter();
  @Output() onadditem: EventEmitter<any> = new EventEmitter();
  @Output() onrenameitem: EventEmitter<any> = new EventEmitter();
  @Output() onremoveitem: EventEmitter<any> = new EventEmitter();
  @Input()
  set config(config: TreeConfig) {
    this.setConfig(config);
  }
  @Input()
  set treeData(item: TreeModel[]) {
    this.getTreeData(item);
  }
  constructor(public treeService: NgxTreeService, private fb: FormBuilder) {
    this.type = 'root';
    this.enableSubscribers();
  }
  setConfig(config) {
    for (const key of Object.keys(config)) {
      this.setValue(key, config);
    }
     this.treeService._config.next(this._config);
  }
  setValue(item, config) {
    this._config[item] = config[item];
  }
  enableSubscribers() {
    this.treeService.onDrop.subscribe(
      (event) => {
        this.ondrop.emit(event);
      }
    );
    this.treeService.onDragStart.subscribe(
      (event) => {
        this.ondragstart.emit(event);
      }
    );
    this.treeService.onAllowDrop.subscribe(
      (event) => {
        this.onallowdrop.emit(event);
      }
    );
    this.treeService.onDragEnd.subscribe(
      (event) => {
        this.ondragend.emit(event);
      }
    );
    this.treeService.onAddItem.subscribe(
      (event) => {
        this.onadditem.emit(event);
      }
    );
    this.treeService.onRenameItem.subscribe(
      (event) => {
        this.onrenameitem.emit(event);
      }
    );
    this.treeService.onRemoveItem.subscribe(
      (event) => {
        this.onremoveitem.emit(event);
      }
    );
  }

  getTreeData(userTree) {
    this.treeService.getLocalData(userTree).subscribe(
      (tree: TreeModel) => {
        this.treeView = tree;
      }, (error) => {
        console.log(error);
      }
    );
  }
  addRootItem() {
      const d = `${new Date().getFullYear()}${new Date().getDay()}${new Date().getTime()}`;
      const elemId =  parseInt( d, 10 );
      const type = 'root';
      const name = null;
      this.treeService.addNewItem(elemId, name, type);
  }
  onDrop(event, item) {
    const eventObj = {
      event,
      target: item
    };
    this.ondrop.emit(eventObj);
    const dragItem = this.treeService.isDragging;
    this.treeService.dropOnRoot(dragItem);
    event.preventDefault();
  }
  onDragStart(event) {
    this.ondragstart.emit(event);
  }
  onDropChild(event) {
    this.ondrop.emit(event);
  }

  ngOnInit() {}
}
