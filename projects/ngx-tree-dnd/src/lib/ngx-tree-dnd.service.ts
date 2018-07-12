/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { TreeModel, TreeConfig } from './models/tree-view.model';

@Injectable({
  providedIn: 'root'
})
export class NgxTreeService {
  treeStorage: TreeModel[] = [];
  listOfSelectedElement: TreeModel[];
  parentOfSelected: TreeModel;
  private selectedElement: TreeModel;
  isDragging: TreeModel;
  dragEvent: {};
  direction: string;
  lastExpandState: boolean;
  onDragStart = new Subject<any>();
  onDragEnter = new Subject<any>();
  onDragLeave = new Subject<any>();
  onDrop = new Subject<any>();
  onDrag = new Subject<any>();
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
      showActionButtons: true,
      showAddButtons: true,
      showRenameButtons: true,
      showDeleteButtons: true,
      enableExpandButtons: true,
      enableDragging: true,
      rootTitle: 'Root',
      validationText: 'Enter valid name',
      minCharacterLength: 1,
      setItemsAsLinks: false,
      setFontSize: 16,
      setIconSize: 14
    };
  }

  /*
    get data and set it on observable.
    if data = null set empty data array
  */
  public getLocalData(item) {
    const data = new Observable(observer => {
    this.treeStorage = item;
      if ( this.treeStorage && this.treeStorage !== null ) {
        this.checkTreeLength();
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
   private elementFinder(list, id, parent?) {
    for (const item of list ) {
      if (item.id === id) {
        this.selectedElement = item; // finded element by id
        this.listOfSelectedElement = list;
        if (parent) {
          this.parentOfSelected = item;
        }
        break;
      } else {
        if (item.childrens.length > 0 ) {
          this.elementFinder(item.childrens, id, item); // recoursive call
        }
      }
    }
  }


   /*
   Add new item to tree.
   It`s accepts 'type' for detect add root element or children.
   Emit onAddItem Subject.
  */
  public addNewItem(id, name, parent?) {
    let pos = 1;
    if (parent.childrens.length !== 0) {
      const parentPrevChildren = parent.childrens.length - 1;
      const newItemPosition = parent.childrens[parentPrevChildren].options.position + 1;
      pos = newItemPosition;
    }
    const createObj: TreeModel = {
      id,
      name,
      options:  {
        position: pos,
        edit: true
      },
      childrens: []
    };
    const eventEmit = {
      element: createObj,
      parentList: this.selectedElement
    };
    this.onAddItem.next(eventEmit);
    this.elementFinder(this.treeStorage, parent.id);
    this.selectedElement.childrens.push(createObj);
    this.clearAction();
  }

  /*
   Delete element.
   It`s accepts 'id' for find item on tree.
   Emit onRemoveItem Subject.
  */
  public deleteItem(id) {
    const eventEmit = {
      element: this.selectedElement,
      parentList: this.listOfSelectedElement
    };
    this.onRemoveItem.next(eventEmit);
    this.elementFinder(this.treeStorage, id);
    const i = this.listOfSelectedElement.indexOf(this.selectedElement);
    this.listOfSelectedElement.splice(i, 1);
    this.clearAction();
    this.checkTreeLength();
  }

  /*
   Rename element.
   It`s accepts 'name' and 'id' for find item on tree and set the name.
   Emit onRenameItem Subject.
  */
  public renameItem(name, id) {
    this.elementFinder(this.treeStorage, id);
    // event emit
    const eventEmit = {
      element: this.selectedElement,
      parentList: this.listOfSelectedElement
    };
    this.onRenameItem.next(eventEmit);
    // code
    this.selectedElement.name = name;
    this.selectedElement.options.edit = false;
    this.clearAction();
  }

  /*
   Event: ondragstart;
   On start dragging find element my id and set option currentlyDragging true.
  */
  public startDragging(eventObj) {
    this.switchDropButton(true, this.treeStorage);
  }

  /*
   Event: ondrag;
   Trigger dragging element
  */
  public onDragProcess(eventObj) {
    // none
  }

  /*
   Event: ondragend;
   detect end of drag action
  */
  public dragEndAction(eventObj) {
    this.removeDestenationBorders(this.treeStorage);
    this.switchDropButton(false, this.treeStorage);
  }

  /*
    Event: enterdropzone;
    Entering drop zone for styling items.
  */
  public enterDropZone(eventObj) {
    // none
  }


  /*
    Event: dragover;
    Detect hover on dropable elements
  */
  public onDragOver(eventObj) {
      const el = (eventObj.target as TreeModel);
      if (el && el.id !== this.isDragging.id ) {
        const elementHalfHeight = eventObj.event.toElement.offsetHeight / 2;
          if (eventObj.event.offsetY < elementHalfHeight) {
            el.options.destenationBottom = false;
            el.options.destenationTop = true;
          } else  {
            el.options.destenationBottom = true;
            el.options.destenationTop = false;
          }
      }
  }

  /*
    Event: leavedropzone;
    Leave drop zone for restyling items.
  */
  public leaveDropZone(eventObj) {
      this.removeDestenationBorders(this.treeStorage);
  }

  /*
    Event: ondrop;
    Its use where draggable item drop not on allowed for drop zone:
    set item option currentlyDragging false.
    return false.
 */
  public onDropItem(eventObj) {
    if ( eventObj.target ) {
      const elementHalfHeight = eventObj.event.toElement.offsetHeight / 2;
        if (  eventObj.event.offsetY < elementHalfHeight ) {
          this.changeItemPosition(eventObj.target, 'up');
        } else {
          this.changeItemPosition(eventObj.target, 'down');
        }
    } else {
      const dropZoneId = parseInt(eventObj.event.target.getAttribute('data-id'), null);
      this.elementFinder(this.treeStorage, this.isDragging.id);
      const i = this.listOfSelectedElement.indexOf(this.selectedElement);
      const copyItem = this.listOfSelectedElement.splice(i, 1)[0];
      this.elementFinder(this.treeStorage, dropZoneId);
      this.selectedElement.childrens.push(copyItem);
      this.sortTree();
    }
    this.removeDestenationBorders(this.treeStorage);
    this.switchDropButton(false, this.treeStorage);
    this.clearAction();
    setTimeout(() => {
      this.checkTreeLength();
    });
  }

  /*
    change position of items
    need set direction before use
  */
  private changeItemPosition(el, direction) {
    setTimeout( () => {
      this.elementFinder(this.treeStorage, this.isDragging.id);
      const i = this.listOfSelectedElement.indexOf(this.selectedElement);
      const copyItem = this.listOfSelectedElement.splice(i, 1)[0];
      // end test
      const positionTarget = el.options.position;
      this.elementFinder(this.treeStorage, el.id);
      if (direction === 'up') {
        for (const items of this.listOfSelectedElement) {
          if ( items.options.position >= positionTarget ) {
            items.options.position = items.options.position + 1;
            copyItem.options.position = positionTarget;
          }
        }
      } else {
        for (const items of this.listOfSelectedElement) {
          if ( items.options.position <=  positionTarget ) {
            items.options.position = items.options.position - 1;
          }
        }
      }
      copyItem.options.position = positionTarget;
      this.listOfSelectedElement.push(copyItem);
      this.sortTree();
    });
  }

  // get position of item
  getItemPosition(item) {
    this.elementFinder(this.treeStorage, item.id);
    let position = this.listOfSelectedElement.indexOf(this.selectedElement);
    return ++position;
  }

  // sort tree byposition
  public sortTree() {
    this.sortElements(this.treeStorage);
  }

  // part of sortTree()
  private sortElements (tree) {
    tree.sort( this.compate );
    for (const item of tree ) {
      if (item.childrens.length > 0) {
       this.sortElements(item.childrens);
      }
    }
  }

  // part of sortTree()
  private compate(a, b) {
      if (a.options.position < b.options.position) {
        return -1;
      }
      if (a.options.position > b.options.position) {
        return 1;
      }
      return 0;
  }

  // clear selectedElement && isDragging from element finder.
  private clearAction() {
    this.selectedElement = null;
    this.listOfSelectedElement = null;
  }

  private removeDestenationBorders(data) {
    for (const item of data) {
      item.options.destenationBottom = false;
      item.options.destenationTop = false;
      if (item.childrens.length > 0) {
        this.removeDestenationBorders(item.childrens);
      }
    }
  }

  private switchDropButton(bool, data) {
      for (const el of data) {
        el.options.showActionButtons = !bool;
        if (el.id !== this.isDragging.id) {
          el.options.showDropChildZone = bool;
        }
        if (el.childrens.length > 0) {
          this.switchDropButton(bool, el.childrens);
        }
      }
  }

  public checkTreeLength() {
    if (this.treeStorage.length < 2) {
      this.treeStorage[0].options.showDeleteButton = false;
    } else {
      for (const el of this.treeStorage) {
        el.options.showDeleteButton = true;
      }
    }
  }
}
