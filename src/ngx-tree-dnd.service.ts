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
  onDragStart = new Subject<any>();
  onDrop = new Subject<any>();
  onAllowDrop = new Subject<any>();
  constructor() {
  }
  getLocalData(userTree) {
    const data = new Observable(observer => {
    this.treeStorage = userTree;
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
     // localStorage.setItem('userTree', JSON.stringify(this.treeStorage));
    } else {
      // from children

      const createObj: TreeModel = {
        id,
        name,
        childrens: []
      };
      this.elementFinder(this.treeStorage, parent);
      this.selectedElement.childrens.push(createObj);
      // localStorage.setItem('userTree', JSON.stringify(this.treeStorage));
    }
    this.clearAction();
  }
  deleteItem(id) {
    this.elementFinder(this.treeStorage, id);
    const i = this.listOfSelectedElement.indexOf(this.selectedElement);
    this.listOfSelectedElement.splice(i, 1);
    localStorage.setItem('userTree', JSON.stringify(this.treeStorage));
    this.clearAction();
  }
  renameItem(name, id) {
    this.elementFinder(this.treeStorage, id);
    this.selectedElement.name = name;
    // localStorage.setItem('userTree', JSON.stringify(this.treeStorage));
    this.clearAction();
  }
  dropAction(el, to) {
    if (el !== to) {
      this.deleteItem(el.id);
      this.elementFinder(this.treeStorage, to.id);
      this.selectedElement.childrens.push(el);
      // localStorage.setItem('userTree', JSON.stringify(this.treeStorage));
    } else {
      return false;
    }
    this.clearAction();
  }
  dropOnRoot(el) {
    this.deleteItem(el.id);
    this.treeStorage.push(el);
    this.clearAction();
  }
  clearAction() {
    this.selectedElement = null;
    this.isDragging = null;
  }
}
