import { Component, Directive, ElementRef, EventEmitter, Injectable, Input, NgModule, Output, Pipe, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import { Subject as Subject$1 } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeService = (function () {
    function NgxTreeService() {
        this.treeStorage = [];
        this.onDragStart = new Subject$1();
        this.onDrop = new Subject$1();
        this.onAllowDrop = new Subject$1();
        this.onDragEnd = new Subject$1();
        this.onAddItem = new Subject$1();
        this.onRenameItem = new Subject$1();
        this.onRemoveItem = new Subject$1();
        this._config = new BehaviorSubject$1(null);
        this.globalPositionCounter = 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    NgxTreeService.prototype.getLocalData = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        var /** @type {?} */ data = new Observable$1(function (observer) {
            _this.treeStorage = item;
            if (_this.treeStorage && _this.treeStorage !== null) {
                observer.next(_this.treeStorage);
            }
            else {
                _this.treeStorage = JSON.parse('[]');
                observer.next(_this.treeStorage);
            }
        });
        return data;
    };
    /**
     * @param {?} list
     * @param {?} id
     * @return {?}
     */
    NgxTreeService.prototype.elementFinder = /**
     * @param {?} list
     * @param {?} id
     * @return {?}
     */
    function (list, id) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.id === id) {
                this.selectedElement = item;
                this.listOfSelectedElement = list;
                break;
            }
            else {
                if (item.childrens.length > 0) {
                    this.elementFinder(item.childrens, id);
                }
            }
        }
    };
    /**
     * @param {?} id
     * @param {?} name
     * @param {?} type
     * @param {?=} parent
     * @return {?}
     */
    NgxTreeService.prototype.addNewItem = /**
     * @param {?} id
     * @param {?} name
     * @param {?} type
     * @param {?=} parent
     * @return {?}
     */
    function (id, name, type, parent) {
        if (type === 'root') {
            // from root
            var /** @type {?} */ createObj = {
                id: id,
                name: name,
                childrens: []
            };
            this.treeStorage.push(createObj);
            var /** @type {?} */ eventEmit = {
                element: createObj,
                parent: this.treeStorage
            };
            this.onAddItem.next(eventEmit);
        }
        else {
            // from children
            var /** @type {?} */ createObj = {
                id: id,
                name: name,
                childrens: []
            };
            this.elementFinder(this.treeStorage, parent.id);
            this.selectedElement.childrens.push(createObj);
            var /** @type {?} */ eventEmit = {
                element: createObj,
                parentList: this.selectedElement
            };
            this.onAddItem.next(eventEmit);
        }
        this.clearAction();
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NgxTreeService.prototype.deleteItem = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.elementFinder(this.treeStorage, id);
        var /** @type {?} */ i = this.listOfSelectedElement.indexOf(this.selectedElement);
        this.listOfSelectedElement.splice(i, 1);
        var /** @type {?} */ eventEmit = {
            element: this.selectedElement,
            parentList: this.listOfSelectedElement
        };
        this.onRemoveItem.next(eventEmit);
        this.clearAction();
    };
    /**
     * @param {?} name
     * @param {?} id
     * @return {?}
     */
    NgxTreeService.prototype.renameItem = /**
     * @param {?} name
     * @param {?} id
     * @return {?}
     */
    function (name, id) {
        this.elementFinder(this.treeStorage, id);
        this.selectedElement.name = name;
        var /** @type {?} */ eventEmit = {
            element: this.selectedElement,
            parentList: this.listOfSelectedElement
        };
        this.onRenameItem.next(eventEmit);
        this.clearAction();
    };
    /**
     * @return {?}
     */
    NgxTreeService.prototype.startDragging = /**
     * @return {?}
     */
    function () {
        this.elementFinder(this.treeStorage, this.isDragging.id);
        this.selectedElement.options.currentlyDragging = true;
    };
    /**
     * @param {?} el
     * @param {?} to
     * @return {?}
     */
    NgxTreeService.prototype.dropAction = /**
     * @param {?} el
     * @param {?} to
     * @return {?}
     */
    function (el, to) {
        if (el !== to) {
            el.options.currentlyDragging = false;
            this.deleteItem(el.id);
            this.elementFinder(this.treeStorage, to.id);
            this.selectedElement.childrens.push(el);
            this.clearAction();
        }
        else {
            this.clearAction();
            el.options.currentlyDragging = false;
            return false;
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    NgxTreeService.prototype.dragEndAction = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (el) {
            el.options.currentlyDragging = false;
        }
        return false;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    NgxTreeService.prototype.dropOnRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        el.options.currentlyDragging = false;
        this.deleteItem(el.id);
        this.treeStorage.push(el);
        this.clearAction();
    };
    /**
     * @return {?}
     */
    NgxTreeService.prototype.clearAction = /**
     * @return {?}
     */
    function () {
        this.selectedElement = null;
        this.isDragging = null;
    };
    NgxTreeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxTreeService.ctorParameters = function () { return []; };
    return NgxTreeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeChildrenComponent = (function () {
    function NgxTreeChildrenComponent(treeService, fb) {
        var _this = this;
        this.treeService = treeService;
        this.fb = fb;
        this.type = 'children';
        this.treeService._config.subscribe(function (config) {
            _this._config = config;
            _this.isDragable = _this._config.enableDragging;
            _this.createForm();
        });
    }
    Object.defineProperty(NgxTreeChildrenComponent.prototype, "item", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.itemOptions = {
                href: '#',
                isHidden: false,
                currentlyDragging: false
            };
            if (item.options) {
                this.setOptions(item.options);
                item.options = this.itemOptions;
            }
            else {
                item.options = this.itemOptions;
            }
            this._item = item;
            this.isHidden = this._item.options.isHidden;
            this.checkFloatItem();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} options
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var key = _a[_i];
            this.setValue(key, options);
        }
    };
    /**
     * @param {?} item
     * @param {?} options
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.setValue = /**
     * @param {?} item
     * @param {?} options
     * @return {?}
     */
    function (item, options) {
        this.itemOptions[item] = options[item];
    };
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.checkFloatItem = /**
     * @return {?}
     */
    function () {
        if (this._item.name === null) {
            this.isEdit = true;
        }
        else {
            this.isEdit = false;
        }
    };
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.createForm = /**
     * @return {?}
     */
    function () {
        this.renameForm = this.fb.group({
            name: ['', [
                    Validators.required,
                    Validators.minLength(1)
                ]],
        });
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.onDragStart = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        // event.target.style.opacity = '0.5';
        this.treeService.isDragging = item;
        var /** @type {?} */ eventObj = {
            event: event,
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
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.onDragEnd = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        var /** @type {?} */ dragItem = this.treeService.isDragging;
        this.treeService.dragEndAction(dragItem);
        var /** @type {?} */ eventObj = {
            event: event,
            target: item
        };
        this.treeService.onDragEnd.next(eventObj);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.onDrop = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        var /** @type {?} */ dragItem = this.treeService.isDragging;
        this.treeService.dropAction(dragItem, item);
        event.preventDefault();
        var /** @type {?} */ eventObj = {
            event: event,
            target: item
        };
        this.treeService.onDrop.next(eventObj);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.allowDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.treeService.onAllowDrop.next(event);
    };
    /**
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.submitAdd = /**
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    function (name, type) {
        var /** @type {?} */ d = "" + new Date().getFullYear() + new Date().getDay() + new Date().getTime();
        var /** @type {?} */ elemId = parseInt(d, 10);
        this.treeService.addNewItem(elemId, name, type, this._item);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.submitRename = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.renameForm.valid) {
            this.showError = false;
            this.treeService.renameItem(this.renameForm.value.name, item.id);
            this.isEdit = false;
        }
        else {
            this.showError = true;
        }
    };
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.onSubmitDelete = /**
     * @return {?}
     */
    function () {
        if (!this.isEdit) {
            this.treeService.deleteItem(this._item.id);
        }
        else {
            if (this._item.name === null) {
                this.treeService.deleteItem(this._item.id);
            }
            else {
                this.isEdit = false;
            }
        }
    };
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    NgxTreeChildrenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tree-children',
                    template: "\n  <div class='tree-child' *ngIf=\"_item && _config\"  [draggable]=\"this.isDragable\" (dragstart)=\"onDragStart($event, _item)\" (dragend)=\"onDragEnd($event, _item)\">\n  <div class='pos-relative'>\n      <div>\n              <div class='tree-title d-inline-flex' (drop)=\"onDrop($event, _item)\" (dragover)=\"allowDrop($event)\" *ngIf=\"!isEdit;else onEdit\">\n                      <div *ngIf=\"!_config.setTreeItemAsLinks; else link\">\n                          {{_item.name}}\n                      </div>\n                      <ng-template #link>\n                          <div>\n                             <a [href]=\"_item.options.href\">{{_item.name}}</a>\n                          </div>\n                      </ng-template>\n                      <div class='d-flex' *ngIf=\"_config.showItemActionBtns\">\n                      <button class='btn-add-small' *ngIf=\"_config.showAddItemButton\" (click)='submitAdd(null, type)'><span></span><span></span></button>\n                      <button class='btn-edit-small' *ngIf=\"_config.showRenameButton\" (click)='isEdit = true;'><span>&#x270E;</span></button>\n                      <button class='btn-remove-small' *ngIf=\"_config.showDeleteButton\" (click)='onSubmitDelete()'><span></span><span></span></button>\n                      </div>\n                  </div>\n                  <ng-template #onEdit>\n                      <div class='tree-title d-inline-flex'>\n                          <form [formGroup]=\"renameForm\">\n                              <input type=\"text\" class='input-rename' [ngModel]=\"_item.name\" formControlName=\"name\">\n                          </form>\n                          <div class='d-flex'>\n                              <button class='btn-accept-edit-small' (click)='submitRename(_item)'><span></span><span></span></button>\n                              <button class='btn-remove-small' (click)='onSubmitDelete()'><span></span><span></span></button>\n                              <div class='error-edit-wrap' *ngIf=\"showError\">\n                                  {{_config.setErrorValidationText}}\n                              </div>\n                          </div>\n                      </div>\n                  </ng-template>\n                  <div class=\"tree-content\" *ngIf=\"_item.childrens && !isHidden\">\n                      <ngx-tree-children *ngFor=\"let item of _item.childrens\" [item]=\"item\"></ngx-tree-children>\n                  </div>\n      </div>\n      <div class='show-hide-switch' *ngIf=\"_config.enableShowHideBtns && _item.childrens.length > 0\">\n          <div *ngIf=\"isHidden; else visible\">\n              <button class='btn-show-small' (click)='isHidden = false'><span></span><span></span></button>\n          </div>\n          <ng-template #visible>\n              <button class='btn-hide-small' (click)='isHidden = true'><span></span></button>\n          </ng-template>\n      </div>\n      <div class='invisible-layer' [ngClass]= \"{blockThis : _item.options.currentlyDragging}\">\n      </div>\n  </div>\n</div>\n\n  "
                },] },
    ];
    /** @nocollapse */
    NgxTreeChildrenComponent.ctorParameters = function () { return [
        { type: NgxTreeService, },
        { type: FormBuilder, },
    ]; };
    NgxTreeChildrenComponent.propDecorators = {
        "item": [{ type: Input },],
    };
    return NgxTreeChildrenComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeComponent = (function () {
    function NgxTreeComponent(treeService, fb) {
        this.treeService = treeService;
        this.fb = fb;
        this._config = {
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
        this.ondragstart = new EventEmitter();
        this.ondrop = new EventEmitter();
        this.onallowdrop = new EventEmitter();
        this.ondragend = new EventEmitter();
        this.onadditem = new EventEmitter();
        this.onrenameitem = new EventEmitter();
        this.onremoveitem = new EventEmitter();
        this.type = 'root';
        this.enableSubscribers();
    }
    Object.defineProperty(NgxTreeComponent.prototype, "config", {
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this.setConfig(config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxTreeComponent.prototype, "treeData", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.getTreeData(item);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} config
     * @return {?}
     */
    NgxTreeComponent.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        for (var _i = 0, _a = Object.keys(config); _i < _a.length; _i++) {
            var key = _a[_i];
            this.setValue(key, config);
        }
        this.treeService._config.next(this._config);
    };
    /**
     * @param {?} item
     * @param {?} config
     * @return {?}
     */
    NgxTreeComponent.prototype.setValue = /**
     * @param {?} item
     * @param {?} config
     * @return {?}
     */
    function (item, config) {
        this._config[item] = config[item];
    };
    /**
     * @return {?}
     */
    NgxTreeComponent.prototype.enableSubscribers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.treeService.onDrop.subscribe(function (event) {
            _this.ondrop.emit(event);
        });
        this.treeService.onDragStart.subscribe(function (event) {
            _this.ondragstart.emit(event);
        });
        this.treeService.onAllowDrop.subscribe(function (event) {
            _this.onallowdrop.emit(event);
        });
        this.treeService.onDragEnd.subscribe(function (event) {
            _this.ondragend.emit(event);
        });
        this.treeService.onAddItem.subscribe(function (event) {
            _this.onadditem.emit(event);
        });
        this.treeService.onRenameItem.subscribe(function (event) {
            _this.onrenameitem.emit(event);
        });
        this.treeService.onRemoveItem.subscribe(function (event) {
            _this.onremoveitem.emit(event);
        });
    };
    /**
     * @param {?} userTree
     * @return {?}
     */
    NgxTreeComponent.prototype.getTreeData = /**
     * @param {?} userTree
     * @return {?}
     */
    function (userTree) {
        var _this = this;
        this.treeService.getLocalData(userTree).subscribe(function (tree) {
            _this.treeView = tree;
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @return {?}
     */
    NgxTreeComponent.prototype.addRootItem = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ d = "" + new Date().getFullYear() + new Date().getDay() + new Date().getTime();
        var /** @type {?} */ elemId = parseInt(d, 10);
        var /** @type {?} */ type = 'root';
        var /** @type {?} */ name = null;
        this.treeService.addNewItem(elemId, name, type);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgxTreeComponent.prototype.onDrop = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        var /** @type {?} */ eventObj = {
            event: event,
            target: item
        };
        this.ondrop.emit(eventObj);
        var /** @type {?} */ dragItem = this.treeService.isDragging;
        this.treeService.dropOnRoot(dragItem);
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxTreeComponent.prototype.onDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ondragstart.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxTreeComponent.prototype.onDropChild = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ondrop.emit(event);
    };
    /**
     * @return {?}
     */
    NgxTreeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    NgxTreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tree-component',
                    template: "\n  <div id='three-wrapper' *ngIf=\"treeView\">\n  <div class='root-title' (drop)=\"onDrop($event, treeView)\" (dragover)=\"child.allowDrop($event)\">\n  {{_config.setRootTitle}}\n  </div>\n<div class='tree-child'>\n   <div class=\"tree-content\">\n       <ngx-tree-children *ngFor=\"let item of treeView\" [item]=\"item\"></ngx-tree-children>\n   </div>\n</div>\n<button class='btn-add-small' *ngIf=\"_config.showAddRootBtn\" (click)='addRootItem()'>\n <span></span>\n <span></span>\n</button>\n</div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgxTreeComponent.ctorParameters = function () { return [
        { type: NgxTreeService, },
        { type: FormBuilder, },
    ]; };
    NgxTreeComponent.propDecorators = {
        "child": [{ type: ViewChild, args: [NgxTreeChildrenComponent,] },],
        "ondragstart": [{ type: Output },],
        "ondrop": [{ type: Output },],
        "onallowdrop": [{ type: Output },],
        "ondragend": [{ type: Output },],
        "onadditem": [{ type: Output },],
        "onrenameitem": [{ type: Output },],
        "onremoveitem": [{ type: Output },],
        "config": [{ type: Input },],
        "treeData": [{ type: Input },],
    };
    return NgxTreeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeDirective = (function () {
    function NgxTreeDirective(el) {
        this.el = el;
    }
    NgxTreeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxTreeDirective]'
                },] },
    ];
    /** @nocollapse */
    NgxTreeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return NgxTreeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Transforms any input value
 */
var NgxTreePipe = (function () {
    function NgxTreePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    NgxTreePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (args === void 0) { args = null; }
        return value;
    };
    NgxTreePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'NgxTreePipe'
                },] },
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxTreePipe.ctorParameters = function () { return []; };
    return NgxTreePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeModule = (function () {
    function NgxTreeModule() {
    }
    /**
     * @return {?}
     */
    NgxTreeModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxTreeModule,
            providers: [NgxTreeService, FormBuilder]
        };
    };
    NgxTreeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule
                    ],
                    declarations: [
                        NgxTreeComponent,
                        NgxTreeChildrenComponent,
                        NgxTreeDirective,
                        NgxTreePipe
                    ],
                    exports: [
                        NgxTreeComponent,
                        NgxTreeChildrenComponent,
                        NgxTreeDirective,
                        NgxTreePipe
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxTreeModule.ctorParameters = function () { return []; };
    return NgxTreeModule;
}());

export { NgxTreeModule, NgxTreeComponent, NgxTreeDirective, NgxTreePipe, NgxTreeService };
