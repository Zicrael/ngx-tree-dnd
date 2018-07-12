/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */

import { Component, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgxTreeService } from '../ngx-tree-dnd.service';
import { TreeModel, TreeConfig, TreeItemOptions } from '../models/tree-view.model';

@Component({
  selector: 'lib-ngx-tree-children',
  templateUrl: './ngx-tree-dnd-children.component.html'
})
export class NgxTreeChildrenComponent implements AfterViewInit {
  showError: boolean;
  config: TreeConfig;
  element: TreeModel;
  dragable: boolean;
  itemOptions: TreeItemOptions;
  childrensArray: TreeModel[];
  renameForm;

  // get item from parent component
  @Input()
  set setItem(data: TreeModel) {
    this.element = data;
    this.itemOptions = {
      href: '#',
      hidden: false,
      hideChildrens: false,
      position: this.treeService.getItemPosition(this.element),
      draggable: true,
      edit: false,
      showActionButtons: true,
      currentlyDragging: false,
      destenationTop: false,
      destenationBottom: false,
      disabled: false,
      showExpandButton: true,
      showDeleteButton: true
    };
    if (this.element.options) {
      this.setOptions(this.element.options);
      this.element.options = this.itemOptions;
    } else {
      this.element.options = this.itemOptions;
    }

    // enable subscribers
    this.enableSubscribers();
    // create form
    this.createForm();
  }

  constructor(private treeService: NgxTreeService, private fb: FormBuilder) {}

  // enable subscribe to config
  enableSubscribers() {
    this.treeService.config.subscribe(
      (config) => {
        if ( config !== null ) {
          this.config = config;
        } else {
          this.config = this.treeService.defaulConfig;
        }
        if (this.element.options.draggable) {
          this.element.options.draggable = this.config.enableDragging;
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

  // create edit form
  createForm() {
    this.renameForm = this.fb.group({
      name: [this.element.name || '' , [
        Validators.required,
        Validators.minLength( this.config.minCharacterLength )
      ]],
    });
  }

  /*
    Event: onadditem;
    Generate id by new Date() by 'full year + day + time'.
    Call addNewItem() from tree service.
  */
  submitAdd(name, item ) {
      const d = `${new Date().getFullYear()}${new Date().getDay()}${new Date().getTime()}`;
      const elemId =  parseInt(d, null);
      this.treeService.addNewItem(elemId, name, item);
      this.element.options.hideChildrens = false;
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
      this.element.options.edit = false;
    } else {
      this.showError = true;
    }
  }

  /*
    Event: onremoveitem;
    Check is item edit, then if name empty delete item.
    Call deleteItem() from tree service.
  */
  onSubmitDelete(item) {
    if (!this.element.options.edit) {
      this.treeService.deleteItem(item.id);
    } else {
      if ( item.name === null ) {
        this.treeService.deleteItem(item.id);
      } else {
        this.element.options.edit = false;
      }
    }
  }

  // after view init
  ngAfterViewInit() {}
}
