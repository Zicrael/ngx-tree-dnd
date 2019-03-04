/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { TreeModel, TreeConfig, FindingResults } from './models/tree-view.model';

@Injectable({
  providedIn: 'root'
})
export class NgxTreeService {
  treeStorage: TreeModel[] = [];
  private findingResults: FindingResults;
  // listOfSelectedElement: TreeModel[];
  // parentOfSelected: TreeModel;
  // private selectedElement: TreeModel;
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
  onStartRenameItem = new Subject<any>();
  onFinishRenameItem = new Subject<any>();
  onStartDeleteItem = new Subject<any>();
  onFinishDeleteItem = new Subject<any>();
  onCancelDeleteItem = new Subject<any>();
  config = new BehaviorSubject<any>(null);
  defaulConfig: TreeConfig;

  constructor() {
    // set default config
    this.defaulConfig = {
      showActionButtons: true,
      showAddButtons: true,
      showRenameButtons: true,
      showDeleteButtons: true,
      showRootActionButtons: true,
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
   Watch out, this is recursive method.
  */
   private elementFinder(list, id, parent?) {
     for (const item of list) {
       if (item.id === id) {
         this.findingResults = {
           foundItem: item,
           itemsList: list
         }
         if (parent) {
           this.findingResults.parentItem = parent;
         }
         break;
       } else {
         if (item.childrens.length > 0) {
           this.elementFinder(item.childrens, id, item);
         }
       }
     }

  }


   /*
   Add new item to tree.
   Its accepts 'type' for detect add root element or children.
   Emit onAddItem Subject.
  */
  public addNewItem(id, name, parent?) {
    let pos = 1;
    if (parent && parent.childrens.length !== 0) {
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
    if(parent != null) {
      this.elementFinder(this.treeStorage, parent ? parent.id : null);
      this.findingResults && this.findingResults.foundItem.childrens.push(createObj);
      parent = this.findingResults.foundItem
    }  else{
      parent = 'root'
      this.treeStorage.push(createObj);
    }
    const eventEmit = {
      element: createObj,
      parent 
    };
    this.onAddItem.next(eventEmit);
    this.clearAction();
  }

  /*
   Delete element.
   It`s accepts 'id' for find item on tree.
   Emit onStartDeleteItem Subject before delete.
   Emit onFinishDeleteItem Subject after submit delete.
   Emit onCancelDeleteItem Subject after on cancel delete.
  */
  public deleteItem(id) {
    this.elementFinder(this.treeStorage, id);
    const eventEmit = {
      element: this.findingResults.foundItem,
      parent: this.findingResults.parentItem || 'root'
    };
    this.onStartDeleteItem.next(eventEmit);
    let text: string;
    if( this.findingResults.foundItem.name ) {
      text = `Do you really want to delete '${this.findingResults.foundItem.name}'?`;
    } else {
      text = `Cancel creating a new item?`;
    }
    if(confirm(text)) {
      this.onFinishDeleteItem.next(eventEmit);
      const i = this.findingResults.itemsList.indexOf(this.findingResults.foundItem);
      this.findingResults.itemsList.splice(i, 1);
    } else {
      this.onCancelDeleteItem.next(eventEmit);
    }
    this.clearAction();
  }

  /*
   Trigger start rename element.
   It`s accepts 'name' and 'id' for find item on tree and set the name.
   Emit onRenameItem Subject.
  */
 public startRenameItem(element) {
    this.elementFinder(this.treeStorage, element.id);
    // event emit
    const eventEmit = {
      element: this.findingResults.foundItem,
      parent: this.findingResults.parentItem || 'root'
    };
    this.onStartRenameItem.next(eventEmit);
  }

  /*
   Rename element.
   It`s accepts 'name' and 'id' for find item on tree and set the name.
   Emit onRenameItem Subject.
  */
  public finishRenameItem(name, id) {
    this.elementFinder(this.treeStorage, id);
    // code
    this.findingResults.foundItem.name = name;
    this.findingResults.foundItem.options.edit = false;
    // event emit
    const eventEmit = {
      element: this.findingResults.foundItem,
      parent: this.findingResults.parentItem || 'root'
    };
    this.onFinishRenameItem.next(eventEmit);
    this.clearAction();
  }

  /*
   Event: ondragstart;
   On start dragging find element my id and set option currentlyDragging true.
  */
  public startDragging(eventObj) {
    this.switchDropButton(true, this.treeStorage);
    this.onDragStart.next(eventObj);
  }

  /*
   Event: ondrag;
   Trigger dragging element
  */
  public onDragProcess(eventObj) {
    this.onDrag.next(eventObj);
  }

  /*
   Event: ondragend;
   detect end of drag action
  */
  public dragEndAction(eventObj) {
    this.removeDestenationBorders(this.treeStorage);
    this.switchDropButton(false, this.treeStorage);
    this.onDragEnd.next(eventObj);
  }

  /*
    Event: enterdropzone;
    Entering drop zone for styling items.
  */
  public enterDropZone(eventObj) {
    this.onDragEnter.next(eventObj);
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
      this.onAllowDrop.next(eventObj);
    }
  }

  /*
    Event: leavedropzone;
    Leave drop zone for restyling items.
  */
  public leaveDropZone(eventObj) {
      this.removeDestenationBorders(this.treeStorage);
      this.onDragLeave.next(eventObj);
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
        this.onDrop.next(eventObj);
    } else {
      const dropZoneId = parseInt(eventObj.event.target.getAttribute('data-id'), null);
      this.elementFinder(this.treeStorage, this.isDragging.id);
      const i = this.findingResults.itemsList.indexOf(this.findingResults.foundItem);
      const copyItem = this.findingResults.itemsList.splice(i, 1)[0];
      this.elementFinder(this.treeStorage, dropZoneId);
      this.findingResults.foundItem.childrens.push(copyItem);
      // this.sortTree();
      eventObj.target = this.findingResults.foundItem;
      this.onDrop.next(eventObj);
    }
    this.removeDestenationBorders(this.treeStorage);
    this.switchDropButton(false, this.treeStorage);
    this.clearAction();
  }

  /*
    change position of items
    need set direction before use
  */
  private changeItemPosition(el, direction) {
    setTimeout( () => {
      this.elementFinder(this.treeStorage, this.isDragging.id);
      const i = this.findingResults.itemsList.indexOf(this.findingResults.foundItem);
      const copyItem = this.findingResults.itemsList.splice(i, 1)[0];
      // end test
      const positionTarget = el.options.position;
      this.elementFinder(this.treeStorage, el.id);
      if (direction === 'up') {
        for (const items of this.findingResults.itemsList) {
          if ( items.options.position >= positionTarget ) {
            items.options.position = items.options.position + 1;
            copyItem.options.position = positionTarget;
          }
        }
      } else {
        for (const items of this.findingResults.itemsList) {
          if ( items.options.position <=  positionTarget ) {
            items.options.position = items.options.position - 1;
          }
        }
      }
      copyItem.options.position = positionTarget;
      this.findingResults.itemsList.push(copyItem);
      this.sortTree();
    });
  }

  // get position of item
  public getItemPosition(item) {
    this.elementFinder(this.treeStorage, item.id);
    let position = this.findingResults.itemsList.indexOf(this.findingResults.foundItem);
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
  public clearAction() {
    this.findingResults = null;
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
}
