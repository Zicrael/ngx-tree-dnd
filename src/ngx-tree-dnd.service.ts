/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { TreeModel } from './tree-view.model';
@Injectable()
export class NgxTreeService {
  treeStorage: TreeModel[] = [];
  listOfSelectedElement: TreeModel[];
  selectedElement: TreeModel;
  isDragging: TreeModel;
  globalPositionCounter: number;
  onDragStart = new Subject<any>();
  onDrop = new Subject<any>();
  onAllowDrop = new Subject<any>();
  onDragEnd = new Subject<any>();
  onAddItem = new Subject<any>();
  onRenameItem = new Subject<any>();
  onRemoveItem = new Subject<any>();
  _config = new BehaviorSubject<any>(null);
  constructor() {
    this.globalPositionCounter = 0;
  }
  getLocalData(item) {
    const data = new Observable(observer => {
    this.treeStorage = item;
      if ( this.treeStorage && this.treeStorage !== null ) {
        observer.next(this.treeStorage);
      } else {
        this.treeStorage  = JSON.parse('[]');
        observer.next(this.treeStorage);
      }
    });
    return data;
  }
  elementFinder(list, id) {
    for (const item of list ) {
      if (item.id === id) {
        this.selectedElement = item;
        this.listOfSelectedElement = list;
        break;
      } else {
        if (item.childrens.length > 0 ) {
          this.elementFinder(item.childrens, id);
        }
      }
    }
  }
  addNewItem(id, name, type, parent?) {
    if (type === 'root') {
      // from root
      const createObj: TreeModel = {
        id,
        name,
        childrens: []
      };
      this.treeStorage.push(createObj);
      const eventEmit = {
        element: createObj,
        parent: this.treeStorage
      };
      this.onAddItem.next(eventEmit);
    } else {
      // from children
      const createObj: TreeModel = {
        id,
        name,
        childrens: []
      };
      this.elementFinder(this.treeStorage, parent.id);
      this.selectedElement.childrens.push(createObj);
      const eventEmit = {
        element: createObj,
        parentList: this.selectedElement
      };
      this.onAddItem.next(eventEmit);
    }
    this.clearAction();
  }
  deleteItem(id) {
    this.elementFinder(this.treeStorage, id);
    const i = this.listOfSelectedElement.indexOf(this.selectedElement);
    this.listOfSelectedElement.splice(i, 1);
    const eventEmit = {
      element: this.selectedElement,
      parentList: this.listOfSelectedElement
    };
    this.onRemoveItem.next(eventEmit);
    this.clearAction();
  }
  renameItem(name, id) {
    this.elementFinder(this.treeStorage, id);
    this.selectedElement.name = name;
    const eventEmit = {
      element: this.selectedElement,
      parentList: this.listOfSelectedElement
    };
    this.onRenameItem.next(eventEmit);
    this.clearAction();
  }
  startDragging () {
    this.elementFinder(this.treeStorage, this.isDragging.id);
    this.selectedElement.options.currentlyDragging = true;
  }
  dropAction(el, to) {
    if (el !== to) {
        el.options.currentlyDragging = false;
        this.deleteItem(el.id);
        this.elementFinder(this.treeStorage, to.id);
        this.selectedElement.childrens.push(el);
        this.clearAction();
    } else {
      this.clearAction();
      el.options.currentlyDragging = false;
      return false;
    }
  }
  dragEndAction(el) {
    if ( el ) {
      el.options.currentlyDragging = false;
    }
    return false;
  }
  dropOnRoot(el) {
    el.options.currentlyDragging = false;
    this.deleteItem(el.id);
    this.treeStorage.push(el);
    this.clearAction();
  }
  clearAction() {
    this.selectedElement = null;
    this.isDragging = null;
  }
}
