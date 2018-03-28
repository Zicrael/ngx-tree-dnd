/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */

import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel, TreeConfig, TreeItemOptions } from './tree-view.model';

@Component({
  selector: 'ngx-tree-children',
  template: `
  <div class='tree-child' *ngIf="item && config"  [draggable]="this.isDragable" (dragstart)="onDragStart($event, item)" (dragend)="onDragEnd($event, item)">
    <div class='pos-relative'>
      <div>
        <div class='tree-title d-inline-flex' (drop)="onDrop($event, item)" (dragover)="allowDrop($event)" *ngIf="!isEdit;else onEdit">
          <div *ngIf="!config.setTreeItemAsLinks; else link">
              {{item.name}}
          </div>
          <ng-template #link>
              <div>
                  <a [href]="item.options.href" class='tree-link'>{{item.name}}</a>
              </div>
          </ng-template>
          <div class='d-flex' *ngIf="config.showItemActionBtns">
          <button class='btn-add-small' *ngIf="config.showAddItemButton" (click)='submitAdd(null, type)'><span></span><span></span></button>
          <button class='btn-edit-small' *ngIf="config.showRenameButton" (click)='isEdit = true;'><span>&#x270E;</span></button>
          <button class='btn-remove-small' *ngIf="config.showDeleteButton" (click)='onSubmitDelete()'><span></span><span></span></button>
          </div>
        </div>
        <ng-template #onEdit>
          <div class='tree-title d-inline-flex'>
              <form [formGroup]="renameForm">
                  <input type="text" class='input-rename' [ngModel]="item.name" formControlName="name">
              </form>
              <div class='d-flex'>
                  <button class='btn-accept-edit-small' (click)='submitRename(item)'><span></span><span></span></button>
                  <button class='btn-remove-small' (click)='onSubmitDelete()'><span></span><span></span></button>
                  <div class='error-edit-wrap' *ngIf="showError">
                      {{config.setErrorValidationText}}
                  </div>
              </div>
          </div>
        </ng-template>
        <div class="tree-content" *ngIf="item.childrens && !isHidden">
            <ngx-tree-children *ngFor="let item of item.childrens" [setItem]="item"></ngx-tree-children>
        </div>
      </div>
      <div class='show-hide-switch' *ngIf="config.enableShowHideBtns && item.childrens.length > 0">
        <div *ngIf="isHidden; else visible">
            <button class='btn-show-small' (click)='isHidden = false'><span></span><span></span></button>
        </div>
        <ng-template #visible>
            <button class='btn-hide-small' (click)='isHidden = true'><span></span></button>
        </ng-template>
      </div>
      <div class='invisible-layer' [ngClass]= "{blockThis : item.options.currentlyDragging}"></div>
    </div>
  </div>
  `
})
export class NgxTreeChildrenComponent implements OnInit {
  type: string;
  isEdit: boolean;
  showError: boolean;
  isHidden: boolean;
  isDragable: boolean;
  renameForm: FormGroup;
  item: TreeModel;
  config: TreeConfig;
  itemOptions: TreeItemOptions;

  // get item from parent component
  @Input()
  set setItem(item: TreeModel) {
    this.itemOptions = {
      href: '#',
      isHidden: false,
      currentlyDragging: false
    };
    if (item.options) {
      this.setOptions(item.options);
      item.options = this.itemOptions;
    } else {
      item.options = this.itemOptions;
    }
    this.item = item;
    this.isHidden = this.item.options.isHidden;
    this.checkFloatItem();
  }

  constructor(private treeService: NgxTreeService, private fb: FormBuilder) {
  // set type of item
    this.type = 'children';
    this.enableSubscribers();
  }

  // enable subscribe to config
  enableSubscribers() {
    this.treeService.config.subscribe(
      (config) => {
        if ( config !== null ) {
          this.config = config;
          this.isDragable = this.config.enableDragging;
          this.createForm();
        } else {
          this.config = this.treeService.defaulConfig;
          this.isDragable = this.config.enableDragging;
          this.createForm();
        }
      }
    );
  }

  // set options to item
  setOptions(options) {
    for (const key of Object.keys(options)) {
      this.setValue(key, options);
    }
  }

  // set value to options keys
  setValue(item, options) {
    this.itemOptions[item] = options[item];
  }

  // check if item has name and set edit;
  checkFloatItem() {
    if (this.item.name === null) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  // create edit form
  createForm() {
    this.renameForm = this.fb.group({
      name: ['' , [
        Validators.required,
        Validators.minLength( this.config.setMinValidationCountChars )
      ]],
    });
  }

  /*
    Event: ondragstart;
    Set item as dragging and call startDragging() from tree service.
    Emit OnDragStart on tree service.
  */
  onDragStart(event, item) {
    this.treeService.isDragging = item;
    const eventObj = {
      event,
      target: item
    };
    event.stopPropagation();
    this.treeService.startDragging();
    this.treeService.onDragStart.next(eventObj);
  }

  /*
    Event: ondragend;
    Call dragEndAction() from tree service.
    Emit OnDragEnd on tree service.
  */
  onDragEnd(event, item) {
    const dragItem = this.treeService.isDragging;
    this.treeService.dragEndAction(dragItem);
    const eventObj = {
      event,
      target: item
    };
    this.treeService.onDragEnd.next(eventObj);
  }

  /*
    Event: ondrop;
    Call dropAction() from tree service.
    Emit OnDrop on tree service.
  */
  onDrop(event, item) {
    const dragItem = this.treeService.isDragging;
    this.treeService.dropAction(dragItem, item);
    event.preventDefault();
    const eventObj = {
      event,
      target: item
    };
    this.treeService.onDrop.next(eventObj);
  }

  /*
    Event: onallowdrop;
    Emit onAllowDrop on tree service.
  */
  allowDrop(event) {
    event.preventDefault();
    this.treeService.onAllowDrop.next(event);
  }

  /*
    Event: onadditem;
    Generate id by new Date() by 'full year + day + time'.
    Call addNewItem() from tree service.
  */
  submitAdd(name, type) {
      const d = `${new Date().getFullYear()}${new Date().getDay()}${new Date().getTime()}`;
      const elemId =  parseInt( d, 10 );
      this.treeService.addNewItem(elemId, name, type, this.item);
  }

  /*
    Event: onrenameitem;
    Check is form valid.
    Call addNewItem() from tree service.
  */
  submitRename( item ) {
    if (this.renameForm.valid) {
      this.showError = false;
      this.treeService.renameItem(this.renameForm.value.name, item.id);
      this.isEdit = false;
    } else {
      this.showError = true;
    }
  }

  /*
    Event: onremoveitem;
    Check is item edit, then if name empty delete item.
    Call deleteItem() from tree service.
  */
  onSubmitDelete() {
    if (!this.isEdit) {
      this.treeService.deleteItem(this.item.id);
    } else {
      if ( this.item.name === null ) {
        this.treeService.deleteItem(this.item.id);
      } else {
        this.isEdit = false;
      }
    }
  }

  // onInit
  ngOnInit() {}
}
