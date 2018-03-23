import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { TreeModel } from './tree-view.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-tree-children',
  template: `
  <div class='tree-child' *ngIf="_item"  draggable="true" (dragstart)="onDragStart($event, _item)" >
    <div class='pos-relative'>
        <div [ngClass]="{inOpacity: isHidden}">
                <div class='tree-title d-inline-flex' (drop)="onDrop($event, _item)"
                 (dragover)="allowDrop($event)" *ngIf="!isEdit;else onEdit">
                        {{_item.name}}
                        <div class='d-flex'>
                        <button class='btn-add-small' (click)='submitAdd(null, type)'><span></span><span></span></button>
                        <button class='btn-edit-small' (click)='isEdit = true;'><span>&#x270E;</span></button>
                        <button class='btn-remove-small' (click)='onSubmitDelete()'><span></span><span></span></button>
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
                                <div class='error-edit-wrap'>
                                    {{errorEdit}}
                                </div>
                            </div>
                        </div>
                    </ng-template>
                    <div class="tree-content" *ngIf="_item.childrens && !isHidden">
                        <ngx-tree-children *ngFor="let item of _item.childrens" [item]="item"></ngx-tree-children>
                    </div>
        </div>
        <div class='show-hide-switch'>
            <div *ngIf="isHidden; else visible">
                <button class='btn-show-small' (click)='isHidden = false'><span></span><span></span></button>
            </div>
            <ng-template #visible>
                <button class='btn-hide-small' (click)='isHidden = true'><span></span></button>
            </ng-template>
        </div>
    </div>
</div>
  `
})
//  <ngx-tree-children [type]='type' [selectedElem]='_item.id'></ngx-tree-children>
export class NgxTreeChildrenComponent implements OnInit {
  _item: TreeModel;
  type: string;
  isEdit: boolean;
  errorEdit: string;
  isHidden: boolean;
  renameForm: FormGroup;
  constructor(private treeService: NgxTreeService, private fb: FormBuilder) {
    this.type = 'children';
    this.isHidden = false;
   }
  @Input()
  set item(item: TreeModel) {
    this._item = item;
    this.checkFloatItem();
    this.createForm();
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
        Validators.minLength(1)
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
      this.errorEdit = '';
      this.treeService.renameItem(this.renameForm.value.name, item.id);
      this.isEdit = false;
      console.log();
    } else {
      this.errorEdit = 'Enter valid name';
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
