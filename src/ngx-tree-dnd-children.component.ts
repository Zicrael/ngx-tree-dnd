/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel, TreeConfig, TreeItemOptions } from './tree-view.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-tree-children',
  template: `
  <div class='tree-child' *ngIf="_item && _config"  [draggable]="this.isDragable" (dragstart)="onDragStart($event, _item)" (dragend)="onDragEnd($event, _item)">
  <div class='pos-relative'>
      <div>
              <div class='tree-title d-inline-flex' (drop)="onDrop($event, _item)" (dragover)="allowDrop($event)" *ngIf="!isEdit;else onEdit">
                      <div *ngIf="!_config.setTreeItemAsLinks; else link">
                          {{_item.name}}
                      </div>
                      <ng-template #link>
                          <div>
                             <a [href]="_item.options.href" class='tree-link'>{{_item.name}}</a>
                          </div>
                      </ng-template>
                      <div class='d-flex' *ngIf="_config.showItemActionBtns">
                      <button class='btn-add-small' *ngIf="_config.showAddItemButton" (click)='submitAdd(null, type)'><span></span><span></span></button>
                      <button class='btn-edit-small' *ngIf="_config.showRenameButton" (click)='isEdit = true;'><span>&#x270E;</span></button>
                      <button class='btn-remove-small' *ngIf="_config.showDeleteButton" (click)='onSubmitDelete()'><span></span><span></span></button>
                      </div>
                  </div>
                  <ng-template #onEdit>
                      <div class='tree-title d-inline-flex'>
                          <form [formGroup]="renameForm">
                              <input type="text" class='input-rename' [ngModel]="_item.name" formControlName="name">
                          </form>
                          <div class='d-flex'>
                              <button class='btn-accept-edit-small' (click)='submitRename(_item)'><span></span><span></span></button>
                              <button class='btn-remove-small' (click)='onSubmitDelete()'><span></span><span></span></button>
                              <div class='error-edit-wrap' *ngIf="showError">
                                  {{_config.setErrorValidationText}}
                              </div>
                          </div>
                      </div>
                  </ng-template>
                  <div class="tree-content" *ngIf="_item.childrens && !isHidden">
                      <ngx-tree-children *ngFor="let item of _item.childrens" [item]="item"></ngx-tree-children>
                  </div>
      </div>
      <div class='show-hide-switch' *ngIf="_config.enableShowHideBtns && _item.childrens.length > 0">
          <div *ngIf="isHidden; else visible">
              <button class='btn-show-small' (click)='isHidden = false'><span></span><span></span></button>
          </div>
          <ng-template #visible>
              <button class='btn-hide-small' (click)='isHidden = true'><span></span></button>
          </ng-template>
      </div>
      <div class='invisible-layer' [ngClass]= "{blockThis : _item.options.currentlyDragging}">
      </div>
  </div>
</div>

  `
})
export class NgxTreeChildrenComponent implements OnInit {
  _item: TreeModel;
  type: string;
  isEdit: boolean;
  showError: boolean;
  isHidden: boolean;
  isDragable: boolean;
  renameForm: FormGroup;
  _config: TreeConfig;
  itemOptions: TreeItemOptions;
  @Input()
  set item(item: TreeModel) {
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
    this._item = item;
    this.isHidden = this._item.options.isHidden;
    this.checkFloatItem();
  }
  constructor(private treeService: NgxTreeService, private fb: FormBuilder) {
    this.type = 'children';
    this.enableSubscribers();
   }
   enableSubscribers() {
    this.treeService._config.subscribe(
      (config) => {
        if ( config !== null ) {
          this._config = config;
          this.isDragable = this._config.enableDragging;
          this.createForm();
        } else {
          this._config = this.treeService.defaulConfig;
          this.isDragable = this._config.enableDragging;
          this.createForm();
        }
      }
    );
  }
  setOptions(options) {
    for (const key of Object.keys(options)) {
      this.setValue(key, options);
    }
  }
  setValue(item, options) {
    this.itemOptions[item] = options[item];
  }
  checkFloatItem() {
    if (this._item.name === null) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }
  createForm() {
    this.renameForm = this.fb.group({
      name: ['' , [
        Validators.required,
        Validators.minLength( this._config.setMinValidationCountChars )
      ]],
    });
  }

  onDragStart(event, item) {
    // event.target.style.opacity = '0.5';
    this.treeService.isDragging = item;
    const eventObj = {
      event,
      target: item
    };
    event.stopPropagation();
    this.treeService.startDragging();
    this.treeService.onDragStart.next(eventObj);
    // const allowed = document.getElementsByClassName('tree-title');
    // const  arr = Array.prototype.slice.call( allowed );
    // console.log(arr);
    // for (const i of arr) {
    //   i.style.border = '1px dashed grey';
    // }
  }
  onDragEnd(event, item) {
    const dragItem = this.treeService.isDragging;
    this.treeService.dragEndAction(dragItem);
    const eventObj = {
      event,
      target: item
    };
    this.treeService.onDragEnd.next(eventObj);
  }
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
  allowDrop(event) {
    event.preventDefault();
    this.treeService.onAllowDrop.next(event);
  }
  submitAdd(name, type) {
      const d = `${new Date().getFullYear()}${new Date().getDay()}${new Date().getTime()}`;
      const elemId =  parseInt( d, 10 );
      this.treeService.addNewItem(elemId, name, type, this._item);
  }
  submitRename( item ) {
    if (this.renameForm.valid) {
      this.showError = false;
      this.treeService.renameItem(this.renameForm.value.name, item.id);
      this.isEdit = false;
    } else {
      this.showError = true;
    }
  }
  onSubmitDelete() {
    if (!this.isEdit) {
      this.treeService.deleteItem(this._item.id);
    } else {
      if ( this._item.name === null ) {
        this.treeService.deleteItem(this._item.id);
      } else {
        this.isEdit = false;
      }
    }
  }
  ngOnInit() {
  }
}
