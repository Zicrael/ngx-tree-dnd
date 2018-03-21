import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel } from './tree-view.model';
// import { SweetAlertsModalsComponent } from './../sweet-alerts-modals/sweet-alerts-modals.component';
@Component({
  selector: 'ngx-tree-children',
  template: `
  <div class='tree-child' *ngIf="_item"  draggable="true" (dragstart)="onDragStart($event, _item)" >
    <div class='tree-title d-inline-flex' (drop)="onDrop($event, _item)" (dragover)="allowDrop($event)">
     {{_item.name}}
        <div class='d-flex'>
        <button class='btn-add-small' ><span></span><span></span></button>
        <button class='btn-edit-small' >
          <img src="http://www.iconninja.com/files/336/3/769/compose-writing-creativ-create-pencil-office-edit-edit-file-icon.png">
        </button>
        <button class='btn-remove-small'><span></span><span></span> </button>
        </div>
    </div>
    <div class="tree-content" *ngIf="_item.childrens">
        <ngx-tree-children *ngFor="let item of _item.childrens" [item]="item"></ngx-tree-children>
    </div>
</div>
  `
})
//  <ngx-tree-children [type]='type' [selectedElem]='_item.id'></ngx-tree-children>
export class NgxTreeChildrenComponent implements OnInit {
  _item: TreeModel;
  type: string;
  // @ViewChild(SweetAlertsModalsComponent) alerts: SweetAlertsModalsComponent;
  constructor(private treeService: NgxTreeService) {
    this.type = 'children';
   }
  @Input()
  set item (item: TreeModel) {
    this._item = item;
  }

  onDragStart(event, item) {
    // event.target.style.opacity = '0.5';
    event.stopPropagation();
    this.treeService.isDragging = item;
    const eventObj = {
      event,
      target: item
    };
    this.treeService.onDragStart.next(eventObj);
    // const allowed = document.getElementsByClassName('tree-title');
    // const  arr = Array.prototype.slice.call( allowed );
    // console.log(arr);
    // for (const i of arr) {
    //   i.style.border = '1px dashed grey';
    // }
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
    this.treeService.onAllowDrop.next(event);
    event.preventDefault();
  }
  // aa
  ngOnInit() {
  }
}
