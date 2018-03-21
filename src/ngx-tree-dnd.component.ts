import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel } from './tree-view.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import swal from 'sweetalert2';
// import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Options } from 'selenium-webdriver/safari';
// import { SweetAlertsModalsComponent } from './sweet-alerts-modals/sweet-alerts-modals.component';
import { NgxTreeChildrenComponent } from './ngx-tree-dnd-children.component';

@Component({
  selector: 'ngx-tree-component',
  template: `
  <div id='three-wrapper'>
       <div class='root-title' (drop)="onDrop($event, treeView)" (dragover)="allowDrop($event)">
        Root
       </div>
    <div class='tree-child'>
        <div class="tree-content">
              <ngx-tree-children *ngFor="let item of treeView" [item]="item" > </ngx-tree-children>
          </div>
      </div>
    <button class='btn-add-small'>
        <span></span>
        <span></span>
    </button>
  </div>
  `
})

// <ngx-tree-children [type]='type'></ngx-tree-children>

export class NgxTreeComponent implements OnInit {
  treeView: TreeModel;
  type: string;
  _userTree: TreeModel[] = [];
  // @ViewChild(SweetAlertsModalsComponent) alerts: SweetAlertsModalsComponent;
  @ViewChild(NgxTreeChildrenComponent) child: NgxTreeChildrenComponent;
  @Output() ondragstart: EventEmitter<any> = new EventEmitter();
  @Output() ondrop: EventEmitter<any> = new EventEmitter();
  @Output() onallowdrop: EventEmitter<any> = new EventEmitter();
  @Input()
  set setTreeData(item: TreeModel[]) {
    this.getTreeData(item);
  }
  constructor(public treeService: NgxTreeService, private fb: FormBuilder) {
    this.type = 'root';
    this.enableSubscribers();
  }
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
  }

  getTreeData(userTree) {
    this.treeService.getLocalData(userTree).subscribe(
      (tree: TreeModel) => {
        this.treeView = tree;
        console.log(this.treeView);
      }, (error) => {
        console.log(error);
      }
    );
  }
  onDrop(event, item) {
    const dragItem = this.treeService.isDragging;
    this.treeService.dropOnRoot(dragItem);
    event.preventDefault();
    const eventObj = {
      event,
      target: item
    };
    this.ondrop.emit(eventObj);
  }

  allowDrop(event) {
    this.onallowdrop.emit(event);
    event.preventDefault();
  }

  onDragStart(event) {
    this.ondragstart.emit(event);
  }
  onDropChild(event) {
    this.ondrop.emit(event);
  }
  ngOnInit() {}
}
