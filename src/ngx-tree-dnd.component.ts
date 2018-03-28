/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel, TreeConfig } from './tree-view.model';

@Component({
  selector: 'ngx-tree-component',
  styleUrls: ['./stypes-tree-dnd.scss'],
  template: `
  <div id='three-wrapper' *ngIf="treeView">
  <div class='root-title' (drop)="onDrop($event, treeView)" (dragover)="allowDrop($event)">
    {{userConfig.setRootTitle}}
  </div>
  <div class='tree-child'>
    <div class="tree-content">
        <ngx-tree-children *ngFor="let item of treeView" [setItem]="item"></ngx-tree-children>
    </div>
  </div>
  <button class='btn-add-small' *ngIf="userConfig.showAddRootBtn" (click)='addRootItem()'>
  <span></span>
  <span></span>
  </button>
</div>
  `
})
export class NgxTreeComponent implements OnInit {
  treeView: TreeModel;
  type: string;
  userConfig: TreeConfig = {
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
  @Output() ondragstart: EventEmitter<any> = new EventEmitter();
  @Output() ondrop: EventEmitter<any> = new EventEmitter();
  @Output() onallowdrop: EventEmitter<any> = new EventEmitter();
  @Output() ondragend: EventEmitter<any> = new EventEmitter();
  @Output() onadditem: EventEmitter<any> = new EventEmitter();
  @Output() onrenameitem: EventEmitter<any> = new EventEmitter();
  @Output() onremoveitem: EventEmitter<any> = new EventEmitter();

  @Input()
  set config(config: TreeConfig) {
    // seal config
    Object.seal(this.userConfig);
    try {
      // if config it`s pass
      this.setConfig(config);
      this.treeService.config.next(this.userConfig);
    } catch (error) {
      // if config invalid
      console.log('Config is invalid! Default configuragion will be appeared');
      this.treeService.config.next(this.treeService.defaulConfig);
    }
  }

  @Input()
  set treeData(item: TreeModel[]) {
    // get user tree data
      this.getTreeData(item);
  }

  constructor(public treeService: NgxTreeService, private fb: FormBuilder) {
    // set type root
    this.type = 'root';
    this.enableSubscribers();
  }

  // set user config
  setConfig(config) {
    for (const key of Object.keys(config)) {
      this.setValue(key, config);
    }
  }
  // set value to keys of config
  setValue(item, config) {
    this.userConfig[item] = config[item];
  }

  // subscribe to all events and emit them to user.
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

  // get tree data from treeService.
  getTreeData(userTree) {
    this.treeService.getLocalData(userTree).subscribe(
      (tree: TreeModel) => {
        this.treeView = tree;
      }, (error) => {
        console.log(error);
      }
    );
  }

  /*
    Event: onadditem;
    Add root item ( root item = items haven`t parents );
    Call addNewItem from treeService.
  */
  addRootItem() {
      const d = `${new Date().getFullYear()}${new Date().getDay()}${new Date().getTime()}`;
      const elemId =  parseInt( d, 10 );
      const type = 'root';
      const name = null;
      this.treeService.addNewItem(elemId, name, type);
  }

  /*
    Event: ondrop;
    Get Drag item from treeService.
    Call dropOnRoot() from treeService.
    Emit ondrop.
  */
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

  /*
    Event: onallowdrop;
    Emit onAllowDrop on tree service.
  */
  allowDrop(event) {
    event.preventDefault();
    this.treeService.onAllowDrop.next(event);
  }

  ngOnInit() {}
}
