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

import { TreeModel, TreeConfig } from './tree-view.model';

@Injectable()
export class NgxTreeService {
  treeStorage: TreeModel[] = [];
  listOfSelectedElement: TreeModel[];
  selectedElement: TreeModel;
  isDragging: TreeModel;
  onDragStart = new Subject<any>();
  onDrop = new Subject<any>();
  onAllowDrop = new Subject<any>();
  onDragEnd = new Subject<any>();
  onAddItem = new Subject<any>();
  onRenameItem = new Subject<any>();
  onRemoveItem = new Subject<any>();
  config = new BehaviorSubject<any>(null);
  defaulConfig: TreeConfig;

  constructor() {
    // set default config
    this.defaulConfig = {
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
  }

  /*
    get data and set it on observable.
    if data = null set empty data array
  */
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

  /*
   Element finder, it`s find element by id in tree.
   Returns: finded element, parent array.
   Watch out, this is recoursive method.
  */
  elementFinder(list, id) {
    for (const item of list ) {
      if (item.id === id) {
        this.selectedElement = item; // finded element by id
        this.listOfSelectedElement = list; // parent array
        break;
      } else {
        if (item.childrens.length > 0 ) {
          this.elementFinder(item.childrens, id); // recoursive call
        }
      }
    }
  }

   /*
   Add new item to tree.
   It`s accepts 'type' for detect add root element or children.
   Emit onAddItem Subject.
  */
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

  /*
   Delete element.
   It`s accepts 'id' for find item on tree.
   Emit onRemoveItem Subject.
  */
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

  /*
   Rename element.
   It`s accepts 'name' and 'id' for find item on tree and set the name.
   Emit onRenameItem Subject.
  */
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

  /*
   Event: ondragstart;
   On start dragging find element my id and set option currentlyDragging true.
  */
  startDragging () {
    this.elementFinder(this.treeStorage, this.isDragging.id);
    this.selectedElement.options.currentlyDragging = true;
  }

  /*
   Event: ondrop;
   It`s accepts 'el' and 'to' where:
   'el' = dragging element,
   'to' = drop target.
   If 'el' = 'to' clear finded items,
   set 'el' option currentlyDragging false and return false.
  */
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

  /*
    Event: ondragend;
    Its use where draggable item drop not on allowed for drop zone:
    set item option currentlyDragging false.
    return false.
 */
  dragEndAction(el) {
    if ( el ) {
      el.options.currentlyDragging = false;
    }
    return false;
  }

  /*
    Event: ondrop;
    Its use where draggable item drop not on allowed for drop zone:
    set item option currentlyDragging false.
    return false.
 */
  dropOnRoot(el) {
    el.options.currentlyDragging = false;
    this.deleteItem(el.id);
    this.treeStorage.push(el);
    this.clearAction();
  }

  // clear selectedElement && isDragging from element finder.
  clearAction() {
    this.selectedElement = null;
    this.isDragging = null;
    this.listOfSelectedElement = null;
  }
}
