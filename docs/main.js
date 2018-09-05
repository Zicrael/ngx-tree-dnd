(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ngx-tree-dnd/fesm5/ngx-tree-dnd.js":
/*!*************************************************!*\
  !*** ./dist/ngx-tree-dnd/fesm5/ngx-tree-dnd.js ***!
  \*************************************************/
/*! exports provided: NgxTreeService, NgxTreeParentComponent, NgxTreeChildrenComponent, AutoFocusDirective, DragElementsDirective, DropElementsDirective, NgxTreeDndModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTreeService", function() { return NgxTreeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTreeParentComponent", function() { return NgxTreeParentComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTreeChildrenComponent", function() { return NgxTreeChildrenComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoFocusDirective", function() { return AutoFocusDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragElementsDirective", function() { return DragElementsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropElementsDirective", function() { return DropElementsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTreeDndModule", function() { return NgxTreeDndModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeService = /** @class */ (function () {
    function NgxTreeService() {
        this.treeStorage = [];
        this.onDragStart = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onDragEnter = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onDragLeave = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onDrop = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onDrag = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onAllowDrop = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onDragEnd = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onAddItem = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onRenameItem = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onRemoveItem = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.config = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
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
        var /** @type {?} */ data = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.treeStorage = item;
            if (_this.treeStorage && _this.treeStorage !== null) {
                _this.checkTreeLength();
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
     * @param {?=} parent
     * @return {?}
     */
    NgxTreeService.prototype.elementFinder = /**
     * @param {?} list
     * @param {?} id
     * @param {?=} parent
     * @return {?}
     */
    function (list, id, parent) {
        try {
            for (var list_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                var item = list_1_1.value;
                if (item.id === id) {
                    this.selectedElement = item; // finded element by id
                    this.listOfSelectedElement = list;
                    if (parent) {
                        this.parentOfSelected = item;
                    }
                    break;
                }
                else {
                    if (item.childrens.length > 0) {
                        this.elementFinder(item.childrens, id, item); // recoursive call
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    /**
     * @param {?} id
     * @param {?} name
     * @param {?=} parent
     * @return {?}
     */
    NgxTreeService.prototype.addNewItem = /**
     * @param {?} id
     * @param {?} name
     * @param {?=} parent
     * @return {?}
     */
    function (id, name, parent) {
        var /** @type {?} */ pos = 1;
        if (parent.childrens.length !== 0) {
            var /** @type {?} */ parentPrevChildren = parent.childrens.length - 1;
            var /** @type {?} */ newItemPosition = parent.childrens[parentPrevChildren].options.position + 1;
            pos = newItemPosition;
        }
        var /** @type {?} */ createObj = {
            id: id,
            name: name,
            options: {
                position: pos,
                edit: true
            },
            childrens: []
        };
        var /** @type {?} */ eventEmit = {
            element: createObj,
            parentList: this.selectedElement
        };
        this.elementFinder(this.treeStorage, parent.id);
        this.selectedElement.childrens.push(createObj);
        this.clearAction();
        this.onAddItem.next(eventEmit);
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
        var /** @type {?} */ eventEmit = {
            element: this.selectedElement,
            parentList: this.listOfSelectedElement
        };
        this.elementFinder(this.treeStorage, id);
        var /** @type {?} */ i = this.listOfSelectedElement.indexOf(this.selectedElement);
        this.listOfSelectedElement.splice(i, 1);
        this.clearAction();
        this.checkTreeLength();
        this.onRemoveItem.next(eventEmit);
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
        // event emit
        var /** @type {?} */ eventEmit = {
            element: this.selectedElement,
            parentList: this.listOfSelectedElement
        };
        // code
        this.selectedElement.name = name;
        this.selectedElement.options.edit = false;
        this.clearAction();
        this.onRenameItem.next(eventEmit);
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.startDragging = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        this.switchDropButton(true, this.treeStorage);
        this.onDragStart.next(eventObj);
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.onDragProcess = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        this.onDrag.next(eventObj);
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.dragEndAction = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        this.removeDestenationBorders(this.treeStorage);
        this.switchDropButton(false, this.treeStorage);
        this.onDragEnd.next(eventObj);
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.enterDropZone = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        this.onDragEnter.next(eventObj);
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.onDragOver = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        var /** @type {?} */ el = (/** @type {?} */ (eventObj.target));
        if (el && el.id !== this.isDragging.id) {
            var /** @type {?} */ elementHalfHeight = eventObj.event.toElement.offsetHeight / 2;
            if (eventObj.event.offsetY < elementHalfHeight) {
                el.options.destenationBottom = false;
                el.options.destenationTop = true;
            }
            else {
                el.options.destenationBottom = true;
                el.options.destenationTop = false;
            }
            this.onAllowDrop.next(eventObj);
        }
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.leaveDropZone = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        this.removeDestenationBorders(this.treeStorage);
        this.onDragLeave.next(eventObj);
    };
    /**
     * @param {?} eventObj
     * @return {?}
     */
    NgxTreeService.prototype.onDropItem = /**
     * @param {?} eventObj
     * @return {?}
     */
    function (eventObj) {
        var _this = this;
        if (eventObj.target) {
            var /** @type {?} */ elementHalfHeight = eventObj.event.toElement.offsetHeight / 2;
            if (eventObj.event.offsetY < elementHalfHeight) {
                this.changeItemPosition(eventObj.target, 'up');
            }
            else {
                this.changeItemPosition(eventObj.target, 'down');
            }
            this.onDrop.next(eventObj);
        }
        else {
            var /** @type {?} */ dropZoneId = parseInt(eventObj.event.target.getAttribute('data-id'), null);
            this.elementFinder(this.treeStorage, this.isDragging.id);
            var /** @type {?} */ i = this.listOfSelectedElement.indexOf(this.selectedElement);
            var /** @type {?} */ copyItem = this.listOfSelectedElement.splice(i, 1)[0];
            this.elementFinder(this.treeStorage, dropZoneId);
            this.selectedElement.childrens.push(copyItem);
            this.sortTree();
            eventObj.target = this.selectedElement;
            this.onDrop.next(eventObj);
        }
        this.removeDestenationBorders(this.treeStorage);
        this.switchDropButton(false, this.treeStorage);
        this.clearAction();
        setTimeout(function () {
            _this.checkTreeLength();
        });
    };
    /**
     * @param {?} el
     * @param {?} direction
     * @return {?}
     */
    NgxTreeService.prototype.changeItemPosition = /**
     * @param {?} el
     * @param {?} direction
     * @return {?}
     */
    function (el, direction) {
        var _this = this;
        setTimeout(function () {
            _this.elementFinder(_this.treeStorage, _this.isDragging.id);
            var /** @type {?} */ i = _this.listOfSelectedElement.indexOf(_this.selectedElement);
            var /** @type {?} */ copyItem = _this.listOfSelectedElement.splice(i, 1)[0];
            // end test
            var /** @type {?} */ positionTarget = el.options.position;
            _this.elementFinder(_this.treeStorage, el.id);
            if (direction === 'up') {
                try {
                    for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.listOfSelectedElement), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var items = _b.value;
                        if (items.options.position >= positionTarget) {
                            items.options.position = items.options.position + 1;
                            copyItem.options.position = positionTarget;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                try {
                    for (var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.listOfSelectedElement), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var items = _e.value;
                        if (items.options.position <= positionTarget) {
                            items.options.position = items.options.position - 1;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            copyItem.options.position = positionTarget;
            _this.listOfSelectedElement.push(copyItem);
            _this.sortTree();
            var e_2, _c, e_3, _f;
        });
    };
    // get position of item
    /**
     * @param {?} item
     * @return {?}
     */
    NgxTreeService.prototype.getItemPosition = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.elementFinder(this.treeStorage, item.id);
        var /** @type {?} */ position = this.listOfSelectedElement.indexOf(this.selectedElement);
        return ++position;
    };
    /**
     * @return {?}
     */
    NgxTreeService.prototype.sortTree = /**
     * @return {?}
     */
    function () {
        this.sortElements(this.treeStorage);
    };
    /**
     * @param {?} tree
     * @return {?}
     */
    NgxTreeService.prototype.sortElements = /**
     * @param {?} tree
     * @return {?}
     */
    function (tree) {
        tree.sort(this.compate);
        try {
            for (var tree_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(tree), tree_1_1 = tree_1.next(); !tree_1_1.done; tree_1_1 = tree_1.next()) {
                var item = tree_1_1.value;
                if (item.childrens.length > 0) {
                    this.sortElements(item.childrens);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (tree_1_1 && !tree_1_1.done && (_a = tree_1.return)) _a.call(tree_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_4, _a;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    NgxTreeService.prototype.compate = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (a.options.position < b.options.position) {
            return -1;
        }
        if (a.options.position > b.options.position) {
            return 1;
        }
        return 0;
    };
    /**
     * @return {?}
     */
    NgxTreeService.prototype.clearAction = /**
     * @return {?}
     */
    function () {
        this.selectedElement = null;
        this.listOfSelectedElement = null;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgxTreeService.prototype.removeDestenationBorders = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        try {
            for (var data_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                item.options.destenationBottom = false;
                item.options.destenationTop = false;
                if (item.childrens.length > 0) {
                    this.removeDestenationBorders(item.childrens);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var e_5, _a;
    };
    /**
     * @param {?} bool
     * @param {?} data
     * @return {?}
     */
    NgxTreeService.prototype.switchDropButton = /**
     * @param {?} bool
     * @param {?} data
     * @return {?}
     */
    function (bool, data) {
        try {
            for (var data_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                var el = data_2_1.value;
                el.options.showActionButtons = !bool;
                if (el.id !== this.isDragging.id) {
                    el.options.showDropChildZone = bool;
                }
                if (el.childrens.length > 0) {
                    this.switchDropButton(bool, el.childrens);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        var e_6, _a;
    };
    /**
     * @return {?}
     */
    NgxTreeService.prototype.checkTreeLength = /**
     * @return {?}
     */
    function () {
        if (this.treeStorage.length < 2) {
            this.treeStorage[0].options.showDeleteButton = false;
        }
        else {
            try {
                for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.treeStorage), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var el = _b.value;
                    if (el && el.options) {
                        el.options.showDeleteButton = true;
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        var e_7, _c;
    };
    NgxTreeService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxTreeService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxTreeService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function NgxTreeService_Factory() { return new NgxTreeService(); }, token: NgxTreeService, providedIn: "root" });
    return NgxTreeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeParentComponent = /** @class */ (function () {
    function NgxTreeParentComponent(treeService) {
        this.treeService = treeService;
        this.userConfig = {
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
        this.ondragstart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ondragenter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ondragleave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ondrop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onallowdrop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ondragend = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onadditem = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onrenameitem = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onremoveitem = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.enableSubscribers();
    }
    Object.defineProperty(NgxTreeParentComponent.prototype, "config", {
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            // seal config
            Object.seal(this.userConfig);
            try {
                // if config it`s pass
                this.setConfig(config);
                this.treeService.config.next(this.userConfig);
            }
            catch (/** @type {?} */ error) {
                // if config invalid
                console.log('Config is invalid! Default configuragion will be appeared');
                this.treeService.config.next(this.treeService.defaulConfig);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxTreeParentComponent.prototype, "treeData", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            // get user tree data
            this.getTreeData(item);
        },
        enumerable: true,
        configurable: true
    });
    // set user config
    /**
     * @param {?} config
     * @return {?}
     */
    NgxTreeParentComponent.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        try {
            for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.keys(config)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                this.setValue(key, config);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    // set value to keys of config
    /**
     * @param {?} item
     * @param {?} config
     * @return {?}
     */
    NgxTreeParentComponent.prototype.setValue = /**
     * @param {?} item
     * @param {?} config
     * @return {?}
     */
    function (item, config) {
        this.userConfig[item] = config[item];
    };
    // subscribe to all events and emit them to user.
    /**
     * @return {?}
     */
    NgxTreeParentComponent.prototype.enableSubscribers = /**
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
        this.treeService.onDragEnter.subscribe(function (event) {
            _this.ondragenter.emit(event);
        });
        this.treeService.onDragLeave.subscribe(function (event) {
            _this.ondragleave.emit(event);
        });
    };
    // get tree data from treeService.
    /**
     * @param {?} userTree
     * @return {?}
     */
    NgxTreeParentComponent.prototype.getTreeData = /**
     * @param {?} userTree
     * @return {?}
     */
    function (userTree) {
        var _this = this;
        this.treeService.getLocalData(userTree).subscribe(function (tree) {
            _this.treeView = tree;
            setTimeout(function () {
                _this.treeService.sortTree();
            });
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @return {?}
     */
    NgxTreeParentComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () { };
    NgxTreeParentComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'lib-ngx-tree-component',
                    template: "<div id='threeWrapper' *ngIf=\"treeView\" [style.font-size.px]='userConfig.setFontSize'>\n    <div class='root-title'>\n      {{userConfig.rootTitle}}\n    </div>\n    <div class='tree-child'>\n      <div class=\"tree-content-main\">\n          <lib-ngx-tree-children [setItem]=\"clild\" *ngFor='let clild of treeView'></lib-ngx-tree-children>\n      </div>\n    </div>\n  </div>"
                },] },
    ];
    /** @nocollapse */
    NgxTreeParentComponent.ctorParameters = function () { return [
        { type: NgxTreeService }
    ]; };
    NgxTreeParentComponent.propDecorators = {
        ondragstart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        ondragenter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        ondragleave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        ondrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        onallowdrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        ondragend: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        onadditem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        onrenameitem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        onremoveitem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        treeData: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgxTreeParentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTreeChildrenComponent = /** @class */ (function () {
    function NgxTreeChildrenComponent(treeService, fb) {
        this.treeService = treeService;
        this.fb = fb;
    }
    Object.defineProperty(NgxTreeChildrenComponent.prototype, "setItem", {
        // get item from parent component
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
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
            }
            else {
                this.element.options = this.itemOptions;
            }
            // enable subscribers
            this.enableSubscribers();
            // create form
            this.createForm();
        },
        enumerable: true,
        configurable: true
    });
    // enable subscribe to config
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.enableSubscribers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.treeService.config.subscribe(function (config) {
            if (config !== null) {
                _this.config = config;
            }
            else {
                _this.config = _this.treeService.defaulConfig;
            }
            if (_this.element.options.draggable) {
                _this.element.options.draggable = _this.config.enableDragging;
            }
        });
    };
    // set options to item
    /**
     * @param {?} options
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        try {
            for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.keys(options)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                this.setValue(key, options);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    // set value to options keys
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
    // create edit form
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.createForm = /**
     * @return {?}
     */
    function () {
        this.renameForm = this.fb.group({
            name: [this.element.name || '', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(this.config.minCharacterLength)
                ]],
        });
    };
    /*
      Event: onadditem;
      Generate id by new Date() by 'full year + day + time'.
      Call addNewItem() from tree service.
    */
    /**
     * @param {?} name
     * @param {?} item
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.submitAdd = /**
     * @param {?} name
     * @param {?} item
     * @return {?}
     */
    function (name, item) {
        var /** @type {?} */ d = "" + new Date().getFullYear() + new Date().getDay() + new Date().getTime();
        var /** @type {?} */ elemId = parseInt(d, null);
        this.treeService.addNewItem(elemId, name, item);
        this.element.options.hideChildrens = false;
    };
    /*
      Event: onrenameitem;
      Check is form valid.
      Call addNewItem() from tree service.
    */
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
            this.element.options.edit = false;
        }
        else {
            this.showError = true;
        }
    };
    /*
      Event: onremoveitem;
      Check is item edit, then if name empty delete item.
      Call deleteItem() from tree service.
    */
    /**
     * @param {?} item
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.onSubmitDelete = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!this.element.options.edit) {
            this.treeService.deleteItem(item.id);
        }
        else {
            if (item.name === null) {
                this.treeService.deleteItem(item.id);
            }
            else {
                this.element.options.edit = false;
            }
        }
    };
    // after view init
    /**
     * @return {?}
     */
    NgxTreeChildrenComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () { };
    NgxTreeChildrenComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'lib-ngx-tree-children',
                    template: "<div class='tree-child' id={{element.id}} libDragElement [draggableValue]='element.options.draggable' [item]='element' [ngClass]=\"{disabled : element.options.disabled}\">\n  <div *ngIf=\"element && element.options\" class='d-flex'>\n    <div *ngIf='config' [ngClass]=\"{hidden : element.options.hidden}\">\n      <div class='tree-title d-inline-flex pos-relative' [ngClass]=\"{destenationTop : element.options.destenationTop, destenationBottom: element.options.destenationBottom}\" *ngIf=\"!element.options.edit;else onEdit\">\n        <div *ngIf=\"!config.setItemsAsLinks; else link\" [ngClass]=\"{addOpacity : element.options.currentlyDragging}\" libDropElement\n          [item]='element' class='draggable-item'>\n          {{element.name}}\n        </div>\n        <ng-template #link>\n          <div [ngClass]=\"{addOpacity : element.options.currentlyDragging}\" libDropElement\n          [item]='element' class='draggable-item'>\n            <a [href]=\"element.options.href\" class='tree-link'>{{element.name}}</a>\n          </div>\n        </ng-template>\n        <div class='d-flex buttons-bar' *ngIf=\"config.showActionButtons && element.options.showActionButtons && !element.options.disabled\">\n          <div class='d-flex'>\n            <button class=\"tree-btn add-btn\" *ngIf=\"config.showAddButtons\" (click)=\"submitAdd(null, element)\">\n              <fa-icon icon=\"plus\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n          </div>\n          <div class='d-flex'>\n            <button class=\"tree-btn edit-btn\" *ngIf=\"config.showRenameButtons\" (click)=\"element.options.edit = true\">\n              <fa-icon icon=\"edit\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n          </div>\n          <div class='d-flex'>\n            <button class=\"tree-btn delete-btn\" *ngIf=\"config.showDeleteButtons && element.options.showDeleteButton\" (click)=\"onSubmitDelete( element )\">\n              <fa-icon icon=\"times\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n          </div>\n        </div>\n        <div class='child-drop-place' [attr.data-id]='element.id'  libDropElement *ngIf='element.options.showDropChildZone && !element.options.disabled'>\n          <fa-icon icon=\"arrow-down\" [style.font-size.px]='config.setIconSize'></fa-icon>\n        </div>\n        <div class='show-hide-switch' *ngIf=\"config.enableExpandButtons && element.options.showExpandButton && element.childrens.length > 0 && !element.options.disabled\">\n          <div *ngIf=\"element.options.hideChildrens; else visible\">\n            <button class='tree-btn show-btn' (click)='element.options.hideChildrens = false'>\n              <fa-icon icon=\"plus\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n          </div>\n          <ng-template #visible>\n            <button class='tree-btn hide-btn' (click)='element.options.hideChildrens = true'>\n              <fa-icon icon=\"minus\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n          </ng-template>\n        </div>\n      </div>\n      <ng-template #onEdit>\n        <div class='tree-title d-inline-flex'>\n          <form [formGroup]=\"renameForm\" class='d-flex' (submit)='submitRename(element)'>\n            <input type=\"text\" class='input-rename' formControlName=\"name\" libAutoFocus=\"true\" [style.font-size.px]='config.setFontSize'>\n          </form>\n          <div class='d-flex'>\n            <button class='tree-btn submit-btn' (click)='submitRename(element)'>\n              <fa-icon icon=\"check\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n            <button class='tree-btn delete-btn' (click)='onSubmitDelete(element)'>\n              <fa-icon icon=\"times\" [style.font-size.px]='config.setIconSize'></fa-icon>\n            </button>\n            <div class='error-edit-wrap' *ngIf=\"showError\">\n              {{config.validationText}}\n            </div>\n          </div>\n        </div>\n      </ng-template>\n      <div class=\"tree-content\" *ngIf=\"element.childrens && !element.options.hideChildrens\">\n        <lib-ngx-tree-children [setItem]=\"child\" *ngFor='let child of element.childrens'></lib-ngx-tree-children>\n      </div>\n    </div>\n  </div>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    NgxTreeChildrenComponent.ctorParameters = function () { return [
        { type: NgxTreeService },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
    ]; };
    NgxTreeChildrenComponent.propDecorators = {
        setItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgxTreeChildrenComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AutoFocusDirective = /** @class */ (function () {
    function AutoFocusDirective(el) {
        this.el = el;
        this.focus = true;
    }
    /**
     * @return {?}
     */
    AutoFocusDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.focus) {
            window.setTimeout(function () {
                _this.el.nativeElement.focus();
            });
        }
    };
    Object.defineProperty(AutoFocusDirective.prototype, "autofocus", {
        set: /**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            this.focus = condition !== false;
        },
        enumerable: true,
        configurable: true
    });
    AutoFocusDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[libAutoFocus]'
                },] },
    ];
    /** @nocollapse */
    AutoFocusDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    AutoFocusDirective.propDecorators = {
        autofocus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return AutoFocusDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DragElementsDirective = /** @class */ (function () {
    function DragElementsDirective(el, treeService) {
        this.el = el;
        this.treeService = treeService;
    }
    Object.defineProperty(DragElementsDirective.prototype, "draggable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.draggableValue;
        },
        enumerable: true,
        configurable: true
    });
    /*
        Event: ondragstart;
        Set item as dragging and call startDragging() from tree service.
        Emit OnDragStart on tree service.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DragElementsDirective.prototype.onDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        this.treeService.isDragging = this.item;
        this.treeService.lastExpandState = this.item.options.hideChildrens;
        this.item.options.hideChildrens = true;
        this.item.options.currentlyDragging = true;
        // call service func
        this.treeService.startDragging(eventObj);
        event.stopPropagation();
    };
    /*
        Event: onDrag;
        trigger drag items and call onDragProcess() from tree service.
        Emit OnDrag on tree service.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DragElementsDirective.prototype.onDrag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        this.treeService.onDragProcess(eventObj);
    };
    /*
        Event: ondragend;
        Call dragEndAction() from tree service.
        Emit OnDragEnd on tree service.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DragElementsDirective.prototype.onDragEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        this.item.options.hideChildrens = this.treeService.lastExpandState;
        this.item.options.currentlyDragging = false;
        this.treeService.dragEndAction(eventObj);
        event.stopPropagation();
    };
    DragElementsDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[libDragElement]'
                },] },
    ];
    /** @nocollapse */
    DragElementsDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: NgxTreeService }
    ]; };
    DragElementsDirective.propDecorators = {
        item: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        draggableValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        draggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['draggable',] }],
        onDragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['dragstart', ['$event'],] }],
        onDrag: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['drag', ['$event'],] }],
        onDragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['dragend', ['$event'],] }]
    };
    return DragElementsDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DropElementsDirective = /** @class */ (function () {
    function DropElementsDirective(el, treeService) {
        this.el = el;
        this.treeService = treeService;
        this.drop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /*
        Event: onallowdrop;
        Call onDragOver() from tree service.
        Emit onAllowDrop on tree service.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DropElementsDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        this.treeService.onDragOver(eventObj);
        event.preventDefault();
    };
    /*
        Event: ondrop;
        Call onDropItem() from tree service.
        Emit OnDrop on tree service.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DropElementsDirective.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ dragItem = this.treeService.isDragging;
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        dragItem.options.hideChildrens = this.treeService.lastExpandState;
        dragItem.options.currentlyDragging = false;
        if (dragItem !== eventObj.target) {
            this.treeService.onDropItem(eventObj);
        }
        event.preventDefault();
    };
    /*s
    Event: ondragenter;
    Detect event where draggable element enter in drop zone.
    Call enterDropZone() from tree service.
    Emit onDragEnter.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DropElementsDirective.prototype.onDragEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        this.treeService.enterDropZone(eventObj);
    };
    /*
        Event: ondragleave;
        Detect event where draggable element leave drop zone.
        Call leaveDropZone() from tree service.
        Emit onDragLeave.
    */
    /**
     * @param {?} event
     * @return {?}
     */
    DropElementsDirective.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // emit events
        var /** @type {?} */ eventObj = {
            event: event,
            target: this.item
        };
        // code
        this.treeService.leaveDropZone(eventObj);
    };
    DropElementsDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[libDropElement]'
                },] },
    ];
    /** @nocollapse */
    DropElementsDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: NgxTreeService }
    ]; };
    DropElementsDirective.propDecorators = {
        item: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        drop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        onDragOver: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['dragover', ['$event'],] }],
        onDrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['drop', ['$event'],] }],
        onDragEnter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['dragenter', ['$event'],] }],
        onDragLeave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['dragleave', ['$event'],] }]
    };
    return DropElementsDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_6__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faCoffee"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faPlus"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faEdit"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faMinus"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faTimes"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faCheck"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faArrowDown"]);
var NgxTreeDndModule = /** @class */ (function () {
    function NgxTreeDndModule() {
    }
    NgxTreeDndModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]
                    ],
                    declarations: [
                        AutoFocusDirective,
                        DragElementsDirective,
                        DropElementsDirective,
                        NgxTreeParentComponent,
                        NgxTreeChildrenComponent
                    ],
                    exports: [
                        AutoFocusDirective,
                        DragElementsDirective,
                        DropElementsDirective,
                        NgxTreeParentComponent,
                        NgxTreeChildrenComponent
                    ]
                },] },
    ];
    return NgxTreeDndModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyZWUtZG5kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdHJlZS1kbmQvbGliL25neC10cmVlLWRuZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdHJlZS1kbmQvbGliL25neC10cmVlLWRuZC1wYXJlbnQvbmd4LXRyZWUtZG5kLXBhcmVudC5jb21wb25lbnQudHMiLCJuZzovL25neC10cmVlLWRuZC9saWIvbmd4LXRyZWUtZG5kLWNoaWxkcmVuL25neC10cmVlLWRuZC1jaGlsZHJlbi5jb21wb25lbnQudHMiLCJuZzovL25neC10cmVlLWRuZC9saWIvZGlyZWN0aXZlcy9uZ3gtdHJlZS1kbmQtYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LXRyZWUtZG5kL2xpYi9kaXJlY3RpdmVzL25neC10cmVlLWRuZC1kcmFnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LXRyZWUtZG5kL2xpYi9kaXJlY3RpdmVzL25neC10cmVlLWRuZC1kcm9wLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LXRyZWUtZG5kL2xpYi9uZ3gtdHJlZS1kbmQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gQ29weXJpZ2h0IChDKSAyMDE4IFlhcm9zbGF2IEtpa290XG4gVGhpcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UuXG4gaHR0cHM6Ly9naXRodWIuY29tL1ppY3JhZWwvbmd4LXRyZWUtZG5kXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHJlZU1vZGVsLCBUcmVlQ29uZmlnIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS12aWV3Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VHJlZVNlcnZpY2Uge1xuICB0cmVlU3RvcmFnZTogVHJlZU1vZGVsW10gPSBbXTtcbiAgbGlzdE9mU2VsZWN0ZWRFbGVtZW50OiBUcmVlTW9kZWxbXTtcbiAgcGFyZW50T2ZTZWxlY3RlZDogVHJlZU1vZGVsO1xuICBwcml2YXRlIHNlbGVjdGVkRWxlbWVudDogVHJlZU1vZGVsO1xuICBpc0RyYWdnaW5nOiBUcmVlTW9kZWw7XG4gIGRyYWdFdmVudDoge307XG4gIGRpcmVjdGlvbjogc3RyaW5nO1xuICBsYXN0RXhwYW5kU3RhdGU6IGJvb2xlYW47XG4gIG9uRHJhZ1N0YXJ0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBvbkRyYWdFbnRlciA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgb25EcmFnTGVhdmUgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIG9uRHJvcCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgb25EcmFnID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBvbkFsbG93RHJvcCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgb25EcmFnRW5kID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBvbkFkZEl0ZW0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIG9uUmVuYW1lSXRlbSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgb25SZW1vdmVJdGVtID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBjb25maWcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIGRlZmF1bENvbmZpZzogVHJlZUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBzZXQgZGVmYXVsdCBjb25maWdcbiAgICB0aGlzLmRlZmF1bENvbmZpZyA9IHtcbiAgICAgIHNob3dBY3Rpb25CdXR0b25zOiB0cnVlLFxuICAgICAgc2hvd0FkZEJ1dHRvbnM6IHRydWUsXG4gICAgICBzaG93UmVuYW1lQnV0dG9uczogdHJ1ZSxcbiAgICAgIHNob3dEZWxldGVCdXR0b25zOiB0cnVlLFxuICAgICAgZW5hYmxlRXhwYW5kQnV0dG9uczogdHJ1ZSxcbiAgICAgIGVuYWJsZURyYWdnaW5nOiB0cnVlLFxuICAgICAgcm9vdFRpdGxlOiAnUm9vdCcsXG4gICAgICB2YWxpZGF0aW9uVGV4dDogJ0VudGVyIHZhbGlkIG5hbWUnLFxuICAgICAgbWluQ2hhcmFjdGVyTGVuZ3RoOiAxLFxuICAgICAgc2V0SXRlbXNBc0xpbmtzOiBmYWxzZSxcbiAgICAgIHNldEZvbnRTaXplOiAxNixcbiAgICAgIHNldEljb25TaXplOiAxNFxuICAgIH07XG4gIH1cblxuICAvKlxuICAgIGdldCBkYXRhIGFuZCBzZXQgaXQgb24gb2JzZXJ2YWJsZS5cbiAgICBpZiBkYXRhID0gbnVsbCBzZXQgZW1wdHkgZGF0YSBhcnJheVxuICAqL1xuICBwdWJsaWMgZ2V0TG9jYWxEYXRhKGl0ZW0pIHtcbiAgICBjb25zdCBkYXRhID0gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgIHRoaXMudHJlZVN0b3JhZ2UgPSBpdGVtO1xuICAgICAgaWYgKCB0aGlzLnRyZWVTdG9yYWdlICYmIHRoaXMudHJlZVN0b3JhZ2UgIT09IG51bGwgKSB7XG4gICAgICAgIHRoaXMuY2hlY2tUcmVlTGVuZ3RoKCk7XG4gICAgICAgIG9ic2VydmVyLm5leHQodGhpcy50cmVlU3RvcmFnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyZWVTdG9yYWdlICA9IEpTT04ucGFyc2UoJ1tdJyk7XG4gICAgICAgIG9ic2VydmVyLm5leHQodGhpcy50cmVlU3RvcmFnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKlxuICAgRWxlbWVudCBmaW5kZXIsIGl0YHMgZmluZCBlbGVtZW50IGJ5IGlkIGluIHRyZWUuXG4gICBSZXR1cm5zOiBmaW5kZWQgZWxlbWVudCwgcGFyZW50IGFycmF5LlxuICAgV2F0Y2ggb3V0LCB0aGlzIGlzIHJlY291cnNpdmUgbWV0aG9kLlxuICAqL1xuICAgcHJpdmF0ZSBlbGVtZW50RmluZGVyKGxpc3QsIGlkLCBwYXJlbnQ/KSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGxpc3QgKSB7XG4gICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVsZW1lbnQgPSBpdGVtOyAvLyBmaW5kZWQgZWxlbWVudCBieSBpZFxuICAgICAgICB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudCA9IGxpc3Q7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudE9mU2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50RmluZGVyKGl0ZW0uY2hpbGRyZW5zLCBpZCwgaXRlbSk7IC8vIHJlY291cnNpdmUgY2FsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAgLypcbiAgIEFkZCBuZXcgaXRlbSB0byB0cmVlLlxuICAgSXRgcyBhY2NlcHRzICd0eXBlJyBmb3IgZGV0ZWN0IGFkZCByb290IGVsZW1lbnQgb3IgY2hpbGRyZW4uXG4gICBFbWl0IG9uQWRkSXRlbSBTdWJqZWN0LlxuICAqL1xuICBwdWJsaWMgYWRkTmV3SXRlbShpZCwgbmFtZSwgcGFyZW50Pykge1xuICAgIGxldCBwb3MgPSAxO1xuICAgIGlmIChwYXJlbnQuY2hpbGRyZW5zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3QgcGFyZW50UHJldkNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVucy5sZW5ndGggLSAxO1xuICAgICAgY29uc3QgbmV3SXRlbVBvc2l0aW9uID0gcGFyZW50LmNoaWxkcmVuc1twYXJlbnRQcmV2Q2hpbGRyZW5dLm9wdGlvbnMucG9zaXRpb24gKyAxO1xuICAgICAgcG9zID0gbmV3SXRlbVBvc2l0aW9uO1xuICAgIH1cbiAgICBjb25zdCBjcmVhdGVPYmo6IFRyZWVNb2RlbCA9IHtcbiAgICAgIGlkLFxuICAgICAgbmFtZSxcbiAgICAgIG9wdGlvbnM6ICB7XG4gICAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICAgIGVkaXQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbnM6IFtdXG4gICAgfTtcbiAgICBjb25zdCBldmVudEVtaXQgPSB7XG4gICAgICBlbGVtZW50OiBjcmVhdGVPYmosXG4gICAgICBwYXJlbnRMaXN0OiB0aGlzLnNlbGVjdGVkRWxlbWVudFxuICAgIH07XG4gICAgdGhpcy5lbGVtZW50RmluZGVyKHRoaXMudHJlZVN0b3JhZ2UsIHBhcmVudC5pZCk7XG4gICAgdGhpcy5zZWxlY3RlZEVsZW1lbnQuY2hpbGRyZW5zLnB1c2goY3JlYXRlT2JqKTtcbiAgICB0aGlzLmNsZWFyQWN0aW9uKCk7XG4gICAgdGhpcy5vbkFkZEl0ZW0ubmV4dChldmVudEVtaXQpO1xuICB9XG5cbiAgLypcbiAgIERlbGV0ZSBlbGVtZW50LlxuICAgSXRgcyBhY2NlcHRzICdpZCcgZm9yIGZpbmQgaXRlbSBvbiB0cmVlLlxuICAgRW1pdCBvblJlbW92ZUl0ZW0gU3ViamVjdC5cbiAgKi9cbiAgcHVibGljIGRlbGV0ZUl0ZW0oaWQpIHtcbiAgICBjb25zdCBldmVudEVtaXQgPSB7XG4gICAgICBlbGVtZW50OiB0aGlzLnNlbGVjdGVkRWxlbWVudCxcbiAgICAgIHBhcmVudExpc3Q6IHRoaXMubGlzdE9mU2VsZWN0ZWRFbGVtZW50XG4gICAgfTtcbiAgICB0aGlzLmVsZW1lbnRGaW5kZXIodGhpcy50cmVlU3RvcmFnZSwgaWQpO1xuICAgIGNvbnN0IGkgPSB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudC5pbmRleE9mKHRoaXMuc2VsZWN0ZWRFbGVtZW50KTtcbiAgICB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudC5zcGxpY2UoaSwgMSk7XG4gICAgdGhpcy5jbGVhckFjdGlvbigpO1xuICAgIHRoaXMuY2hlY2tUcmVlTGVuZ3RoKCk7XG4gICAgdGhpcy5vblJlbW92ZUl0ZW0ubmV4dChldmVudEVtaXQpO1xuICB9XG5cbiAgLypcbiAgIFJlbmFtZSBlbGVtZW50LlxuICAgSXRgcyBhY2NlcHRzICduYW1lJyBhbmQgJ2lkJyBmb3IgZmluZCBpdGVtIG9uIHRyZWUgYW5kIHNldCB0aGUgbmFtZS5cbiAgIEVtaXQgb25SZW5hbWVJdGVtIFN1YmplY3QuXG4gICovXG4gIHB1YmxpYyByZW5hbWVJdGVtKG5hbWUsIGlkKSB7XG4gICAgdGhpcy5lbGVtZW50RmluZGVyKHRoaXMudHJlZVN0b3JhZ2UsIGlkKTtcbiAgICAvLyBldmVudCBlbWl0XG4gICAgY29uc3QgZXZlbnRFbWl0ID0ge1xuICAgICAgZWxlbWVudDogdGhpcy5zZWxlY3RlZEVsZW1lbnQsXG4gICAgICBwYXJlbnRMaXN0OiB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudFxuICAgIH07XG4gICAgLy8gY29kZVxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50Lm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50Lm9wdGlvbnMuZWRpdCA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJBY3Rpb24oKTtcbiAgICB0aGlzLm9uUmVuYW1lSXRlbS5uZXh0KGV2ZW50RW1pdCk7XG4gIH1cblxuICAvKlxuICAgRXZlbnQ6IG9uZHJhZ3N0YXJ0O1xuICAgT24gc3RhcnQgZHJhZ2dpbmcgZmluZCBlbGVtZW50IG15IGlkIGFuZCBzZXQgb3B0aW9uIGN1cnJlbnRseURyYWdnaW5nIHRydWUuXG4gICovXG4gIHB1YmxpYyBzdGFydERyYWdnaW5nKGV2ZW50T2JqKSB7XG4gICAgdGhpcy5zd2l0Y2hEcm9wQnV0dG9uKHRydWUsIHRoaXMudHJlZVN0b3JhZ2UpO1xuICAgIHRoaXMub25EcmFnU3RhcnQubmV4dChldmVudE9iaik7XG4gIH1cblxuICAvKlxuICAgRXZlbnQ6IG9uZHJhZztcbiAgIFRyaWdnZXIgZHJhZ2dpbmcgZWxlbWVudFxuICAqL1xuICBwdWJsaWMgb25EcmFnUHJvY2VzcyhldmVudE9iaikge1xuICAgIHRoaXMub25EcmFnLm5leHQoZXZlbnRPYmopO1xuICB9XG5cbiAgLypcbiAgIEV2ZW50OiBvbmRyYWdlbmQ7XG4gICBkZXRlY3QgZW5kIG9mIGRyYWcgYWN0aW9uXG4gICovXG4gIHB1YmxpYyBkcmFnRW5kQWN0aW9uKGV2ZW50T2JqKSB7XG4gICAgdGhpcy5yZW1vdmVEZXN0ZW5hdGlvbkJvcmRlcnModGhpcy50cmVlU3RvcmFnZSk7XG4gICAgdGhpcy5zd2l0Y2hEcm9wQnV0dG9uKGZhbHNlLCB0aGlzLnRyZWVTdG9yYWdlKTtcbiAgICB0aGlzLm9uRHJhZ0VuZC5uZXh0KGV2ZW50T2JqKTtcbiAgfVxuXG4gIC8qXG4gICAgRXZlbnQ6IGVudGVyZHJvcHpvbmU7XG4gICAgRW50ZXJpbmcgZHJvcCB6b25lIGZvciBzdHlsaW5nIGl0ZW1zLlxuICAqL1xuICBwdWJsaWMgZW50ZXJEcm9wWm9uZShldmVudE9iaikge1xuICAgIHRoaXMub25EcmFnRW50ZXIubmV4dChldmVudE9iaik7XG4gIH1cblxuXG4gIC8qXG4gICAgRXZlbnQ6IGRyYWdvdmVyO1xuICAgIERldGVjdCBob3ZlciBvbiBkcm9wYWJsZSBlbGVtZW50c1xuICAqL1xuICBwdWJsaWMgb25EcmFnT3ZlcihldmVudE9iaikge1xuICAgIGNvbnN0IGVsID0gKGV2ZW50T2JqLnRhcmdldCBhcyBUcmVlTW9kZWwpO1xuICAgIGlmIChlbCAmJiBlbC5pZCAhPT0gdGhpcy5pc0RyYWdnaW5nLmlkICkge1xuICAgICAgY29uc3QgZWxlbWVudEhhbGZIZWlnaHQgPSBldmVudE9iai5ldmVudC50b0VsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMjtcbiAgICAgIGlmIChldmVudE9iai5ldmVudC5vZmZzZXRZIDwgZWxlbWVudEhhbGZIZWlnaHQpIHtcbiAgICAgICAgZWwub3B0aW9ucy5kZXN0ZW5hdGlvbkJvdHRvbSA9IGZhbHNlO1xuICAgICAgICBlbC5vcHRpb25zLmRlc3RlbmF0aW9uVG9wID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSAge1xuICAgICAgICBlbC5vcHRpb25zLmRlc3RlbmF0aW9uQm90dG9tID0gdHJ1ZTtcbiAgICAgICAgZWwub3B0aW9ucy5kZXN0ZW5hdGlvblRvcCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5vbkFsbG93RHJvcC5uZXh0KGV2ZW50T2JqKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgIEV2ZW50OiBsZWF2ZWRyb3B6b25lO1xuICAgIExlYXZlIGRyb3Agem9uZSBmb3IgcmVzdHlsaW5nIGl0ZW1zLlxuICAqL1xuICBwdWJsaWMgbGVhdmVEcm9wWm9uZShldmVudE9iaikge1xuICAgICAgdGhpcy5yZW1vdmVEZXN0ZW5hdGlvbkJvcmRlcnModGhpcy50cmVlU3RvcmFnZSk7XG4gICAgICB0aGlzLm9uRHJhZ0xlYXZlLm5leHQoZXZlbnRPYmopO1xuICB9XG5cbiAgLypcbiAgICBFdmVudDogb25kcm9wO1xuICAgIEl0cyB1c2Ugd2hlcmUgZHJhZ2dhYmxlIGl0ZW0gZHJvcCBub3Qgb24gYWxsb3dlZCBmb3IgZHJvcCB6b25lOlxuICAgIHNldCBpdGVtIG9wdGlvbiBjdXJyZW50bHlEcmFnZ2luZyBmYWxzZS5cbiAgICByZXR1cm4gZmFsc2UuXG4gKi9cbiAgcHVibGljIG9uRHJvcEl0ZW0oZXZlbnRPYmopIHtcbiAgICBpZiAoIGV2ZW50T2JqLnRhcmdldCApIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRIYWxmSGVpZ2h0ID0gZXZlbnRPYmouZXZlbnQudG9FbGVtZW50Lm9mZnNldEhlaWdodCAvIDI7XG4gICAgICAgIGlmICggIGV2ZW50T2JqLmV2ZW50Lm9mZnNldFkgPCBlbGVtZW50SGFsZkhlaWdodCApIHtcbiAgICAgICAgICB0aGlzLmNoYW5nZUl0ZW1Qb3NpdGlvbihldmVudE9iai50YXJnZXQsICd1cCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2hhbmdlSXRlbVBvc2l0aW9uKGV2ZW50T2JqLnRhcmdldCwgJ2Rvd24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRHJvcC5uZXh0KGV2ZW50T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFpvbmVJZCA9IHBhcnNlSW50KGV2ZW50T2JqLmV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSwgbnVsbCk7XG4gICAgICB0aGlzLmVsZW1lbnRGaW5kZXIodGhpcy50cmVlU3RvcmFnZSwgdGhpcy5pc0RyYWdnaW5nLmlkKTtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudC5pbmRleE9mKHRoaXMuc2VsZWN0ZWRFbGVtZW50KTtcbiAgICAgIGNvbnN0IGNvcHlJdGVtID0gdGhpcy5saXN0T2ZTZWxlY3RlZEVsZW1lbnQuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgdGhpcy5lbGVtZW50RmluZGVyKHRoaXMudHJlZVN0b3JhZ2UsIGRyb3Bab25lSWQpO1xuICAgICAgdGhpcy5zZWxlY3RlZEVsZW1lbnQuY2hpbGRyZW5zLnB1c2goY29weUl0ZW0pO1xuICAgICAgdGhpcy5zb3J0VHJlZSgpO1xuICAgICAgZXZlbnRPYmoudGFyZ2V0ID0gdGhpcy5zZWxlY3RlZEVsZW1lbnQ7XG4gICAgICB0aGlzLm9uRHJvcC5uZXh0KGV2ZW50T2JqKTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVEZXN0ZW5hdGlvbkJvcmRlcnModGhpcy50cmVlU3RvcmFnZSk7XG4gICAgdGhpcy5zd2l0Y2hEcm9wQnV0dG9uKGZhbHNlLCB0aGlzLnRyZWVTdG9yYWdlKTtcbiAgICB0aGlzLmNsZWFyQWN0aW9uKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrVHJlZUxlbmd0aCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICBjaGFuZ2UgcG9zaXRpb24gb2YgaXRlbXNcbiAgICBuZWVkIHNldCBkaXJlY3Rpb24gYmVmb3JlIHVzZVxuICAqL1xuICBwcml2YXRlIGNoYW5nZUl0ZW1Qb3NpdGlvbihlbCwgZGlyZWN0aW9uKSB7XG4gICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50RmluZGVyKHRoaXMudHJlZVN0b3JhZ2UsIHRoaXMuaXNEcmFnZ2luZy5pZCk7XG4gICAgICBjb25zdCBpID0gdGhpcy5saXN0T2ZTZWxlY3RlZEVsZW1lbnQuaW5kZXhPZih0aGlzLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICBjb25zdCBjb3B5SXRlbSA9IHRoaXMubGlzdE9mU2VsZWN0ZWRFbGVtZW50LnNwbGljZShpLCAxKVswXTtcbiAgICAgIC8vIGVuZCB0ZXN0XG4gICAgICBjb25zdCBwb3NpdGlvblRhcmdldCA9IGVsLm9wdGlvbnMucG9zaXRpb247XG4gICAgICB0aGlzLmVsZW1lbnRGaW5kZXIodGhpcy50cmVlU3RvcmFnZSwgZWwuaWQpO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1zIG9mIHRoaXMubGlzdE9mU2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKCBpdGVtcy5vcHRpb25zLnBvc2l0aW9uID49IHBvc2l0aW9uVGFyZ2V0ICkge1xuICAgICAgICAgICAgaXRlbXMub3B0aW9ucy5wb3NpdGlvbiA9IGl0ZW1zLm9wdGlvbnMucG9zaXRpb24gKyAxO1xuICAgICAgICAgICAgY29weUl0ZW0ub3B0aW9ucy5wb3NpdGlvbiA9IHBvc2l0aW9uVGFyZ2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtcyBvZiB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudCkge1xuICAgICAgICAgIGlmICggaXRlbXMub3B0aW9ucy5wb3NpdGlvbiA8PSAgcG9zaXRpb25UYXJnZXQgKSB7XG4gICAgICAgICAgICBpdGVtcy5vcHRpb25zLnBvc2l0aW9uID0gaXRlbXMub3B0aW9ucy5wb3NpdGlvbiAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb3B5SXRlbS5vcHRpb25zLnBvc2l0aW9uID0gcG9zaXRpb25UYXJnZXQ7XG4gICAgICB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudC5wdXNoKGNvcHlJdGVtKTtcbiAgICAgIHRoaXMuc29ydFRyZWUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdldCBwb3NpdGlvbiBvZiBpdGVtXG4gIGdldEl0ZW1Qb3NpdGlvbihpdGVtKSB7XG4gICAgdGhpcy5lbGVtZW50RmluZGVyKHRoaXMudHJlZVN0b3JhZ2UsIGl0ZW0uaWQpO1xuICAgIGxldCBwb3NpdGlvbiA9IHRoaXMubGlzdE9mU2VsZWN0ZWRFbGVtZW50LmluZGV4T2YodGhpcy5zZWxlY3RlZEVsZW1lbnQpO1xuICAgIHJldHVybiArK3Bvc2l0aW9uO1xuICB9XG5cbiAgLy8gc29ydCB0cmVlIGJ5cG9zaXRpb25cbiAgcHVibGljIHNvcnRUcmVlKCkge1xuICAgIHRoaXMuc29ydEVsZW1lbnRzKHRoaXMudHJlZVN0b3JhZ2UpO1xuICB9XG5cbiAgLy8gcGFydCBvZiBzb3J0VHJlZSgpXG4gIHByaXZhdGUgc29ydEVsZW1lbnRzICh0cmVlKSB7XG4gICAgdHJlZS5zb3J0KCB0aGlzLmNvbXBhdGUgKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSApIHtcbiAgICAgIGlmIChpdGVtLmNoaWxkcmVucy5sZW5ndGggPiAwKSB7XG4gICAgICAgdGhpcy5zb3J0RWxlbWVudHMoaXRlbS5jaGlsZHJlbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHBhcnQgb2Ygc29ydFRyZWUoKVxuICBwcml2YXRlIGNvbXBhdGUoYSwgYikge1xuICAgICAgaWYgKGEub3B0aW9ucy5wb3NpdGlvbiA8IGIub3B0aW9ucy5wb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5vcHRpb25zLnBvc2l0aW9uID4gYi5vcHRpb25zLnBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gIH1cblxuICAvLyBjbGVhciBzZWxlY3RlZEVsZW1lbnQgJiYgaXNEcmFnZ2luZyBmcm9tIGVsZW1lbnQgZmluZGVyLlxuICBwcml2YXRlIGNsZWFyQWN0aW9uKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmxpc3RPZlNlbGVjdGVkRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZURlc3RlbmF0aW9uQm9yZGVycyhkYXRhKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgIGl0ZW0ub3B0aW9ucy5kZXN0ZW5hdGlvbkJvdHRvbSA9IGZhbHNlO1xuICAgICAgaXRlbS5vcHRpb25zLmRlc3RlbmF0aW9uVG9wID0gZmFsc2U7XG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnJlbW92ZURlc3RlbmF0aW9uQm9yZGVycyhpdGVtLmNoaWxkcmVucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzd2l0Y2hEcm9wQnV0dG9uKGJvb2wsIGRhdGEpIHtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgZGF0YSkge1xuICAgICAgICBlbC5vcHRpb25zLnNob3dBY3Rpb25CdXR0b25zID0gIWJvb2w7XG4gICAgICAgIGlmIChlbC5pZCAhPT0gdGhpcy5pc0RyYWdnaW5nLmlkKSB7XG4gICAgICAgICAgZWwub3B0aW9ucy5zaG93RHJvcENoaWxkWm9uZSA9IGJvb2w7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLmNoaWxkcmVucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5zd2l0Y2hEcm9wQnV0dG9uKGJvb2wsIGVsLmNoaWxkcmVucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjaGVja1RyZWVMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMudHJlZVN0b3JhZ2UubGVuZ3RoIDwgMikge1xuICAgICAgdGhpcy50cmVlU3RvcmFnZVswXS5vcHRpb25zLnNob3dEZWxldGVCdXR0b24gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChjb25zdCBlbCBvZiB0aGlzLnRyZWVTdG9yYWdlKSB7XG4gICAgICAgIGlmIChlbCAmJiBlbC5vcHRpb25zKSB7XG4gICAgICAgICAgZWwub3B0aW9ucy5zaG93RGVsZXRlQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLypcbiBDb3B5cmlnaHQgKEMpIDIwMTggWWFyb3NsYXYgS2lrb3RcbiBUaGlzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVQgbGljZW5zZS5cbiBodHRwczovL2dpdGh1Yi5jb20vWmljcmFlbC9uZ3gtdHJlZS1kbmRcbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmd4VHJlZVNlcnZpY2UgfSBmcm9tICcuLi9uZ3gtdHJlZS1kbmQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwsIFRyZWVDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS12aWV3Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5neC10cmVlLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD0ndGhyZWVXcmFwcGVyJyAqbmdJZj1cInRyZWVWaWV3XCIgW3N0eWxlLmZvbnQtc2l6ZS5weF09J3VzZXJDb25maWcuc2V0Rm9udFNpemUnPlxuICAgIDxkaXYgY2xhc3M9J3Jvb3QtdGl0bGUnPlxuICAgICAge3t1c2VyQ29uZmlnLnJvb3RUaXRsZX19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz0ndHJlZS1jaGlsZCc+XG4gICAgICA8ZGl2IGNsYXNzPVwidHJlZS1jb250ZW50LW1haW5cIj5cbiAgICAgICAgICA8bGliLW5neC10cmVlLWNoaWxkcmVuIFtzZXRJdGVtXT1cImNsaWxkXCIgKm5nRm9yPSdsZXQgY2xpbGQgb2YgdHJlZVZpZXcnPjwvbGliLW5neC10cmVlLWNoaWxkcmVuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTmd4VHJlZVBhcmVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICB0cmVlVmlldzogVHJlZU1vZGVsW107XG4gIHVzZXJDb25maWc6IFRyZWVDb25maWcgPSB7XG4gICAgICBzaG93QWN0aW9uQnV0dG9uczogdHJ1ZSxcbiAgICAgIHNob3dBZGRCdXR0b25zOiB0cnVlLFxuICAgICAgc2hvd1JlbmFtZUJ1dHRvbnM6IHRydWUsXG4gICAgICBzaG93RGVsZXRlQnV0dG9uczogdHJ1ZSxcbiAgICAgIGVuYWJsZUV4cGFuZEJ1dHRvbnM6IHRydWUsXG4gICAgICBlbmFibGVEcmFnZ2luZzogdHJ1ZSxcbiAgICAgIHJvb3RUaXRsZTogJ1Jvb3QnLFxuICAgICAgdmFsaWRhdGlvblRleHQ6ICdFbnRlciB2YWxpZCBuYW1lJyxcbiAgICAgIG1pbkNoYXJhY3Rlckxlbmd0aDogMSxcbiAgICAgIHNldEl0ZW1zQXNMaW5rczogZmFsc2UsXG4gICAgICBzZXRGb250U2l6ZTogMTYsXG4gICAgICBzZXRJY29uU2l6ZTogMTRcbiAgICB9O1xuICBAT3V0cHV0KCkgb25kcmFnc3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25kcmFnZW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25kcmFnbGVhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25kcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uYWxsb3dkcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uZHJhZ2VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbmFkZGl0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25yZW5hbWVpdGVtOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9ucmVtb3ZlaXRlbTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbmZpZyhjb25maWc6IFRyZWVDb25maWcpIHtcbiAgICAvLyBzZWFsIGNvbmZpZ1xuICAgIE9iamVjdC5zZWFsKHRoaXMudXNlckNvbmZpZyk7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGlmIGNvbmZpZyBpdGBzIHBhc3NcbiAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNvbmZpZy5uZXh0KHRoaXMudXNlckNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGlmIGNvbmZpZyBpbnZhbGlkXG4gICAgICBjb25zb2xlLmxvZygnQ29uZmlnIGlzIGludmFsaWQhIERlZmF1bHQgY29uZmlndXJhZ2lvbiB3aWxsIGJlIGFwcGVhcmVkJyk7XG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNvbmZpZy5uZXh0KHRoaXMudHJlZVNlcnZpY2UuZGVmYXVsQ29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdHJlZURhdGEoaXRlbTogVHJlZU1vZGVsW10pIHtcbiAgICAvLyBnZXQgdXNlciB0cmVlIGRhdGFcbiAgICAgIHRoaXMuZ2V0VHJlZURhdGEoaXRlbSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJlZVNlcnZpY2U6IE5neFRyZWVTZXJ2aWNlICkge1xuICAgIHRoaXMuZW5hYmxlU3Vic2NyaWJlcnMoKTtcbiAgfVxuXG4gIC8vIHNldCB1c2VyIGNvbmZpZ1xuICBzZXRDb25maWcoY29uZmlnKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY29uZmlnKSkge1xuICAgICAgdGhpcy5zZXRWYWx1ZShrZXksIGNvbmZpZyk7XG4gICAgfVxuICB9XG4gIC8vIHNldCB2YWx1ZSB0byBrZXlzIG9mIGNvbmZpZ1xuICBzZXRWYWx1ZShpdGVtLCBjb25maWcpIHtcbiAgICB0aGlzLnVzZXJDb25maWdbaXRlbV0gPSBjb25maWdbaXRlbV07XG4gIH1cblxuICAvLyBzdWJzY3JpYmUgdG8gYWxsIGV2ZW50cyBhbmQgZW1pdCB0aGVtIHRvIHVzZXIuXG4gIGVuYWJsZVN1YnNjcmliZXJzKCkge1xuICAgIHRoaXMudHJlZVNlcnZpY2Uub25Ecm9wLnN1YnNjcmliZShcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9uZHJvcC5lbWl0KGV2ZW50KTtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMudHJlZVNlcnZpY2Uub25EcmFnU3RhcnQuc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25kcmFnc3RhcnQuZW1pdChldmVudCk7XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLnRyZWVTZXJ2aWNlLm9uQWxsb3dEcm9wLnN1YnNjcmliZShcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9uYWxsb3dkcm9wLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy50cmVlU2VydmljZS5vbkRyYWdFbmQuc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25kcmFnZW5kLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy50cmVlU2VydmljZS5vbkFkZEl0ZW0uc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25hZGRpdGVtLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy50cmVlU2VydmljZS5vblJlbmFtZUl0ZW0uc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25yZW5hbWVpdGVtLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy50cmVlU2VydmljZS5vblJlbW92ZUl0ZW0uc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25yZW1vdmVpdGVtLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy50cmVlU2VydmljZS5vbkRyYWdFbnRlci5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbmRyYWdlbnRlci5lbWl0KGV2ZW50KTtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMudHJlZVNlcnZpY2Uub25EcmFnTGVhdmUuc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25kcmFnbGVhdmUuZW1pdChldmVudCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8vIGdldCB0cmVlIGRhdGEgZnJvbSB0cmVlU2VydmljZS5cbiAgZ2V0VHJlZURhdGEodXNlclRyZWUpIHtcbiAgICB0aGlzLnRyZWVTZXJ2aWNlLmdldExvY2FsRGF0YSh1c2VyVHJlZSkuc3Vic2NyaWJlKFxuICAgICAgKHRyZWU6IFRyZWVNb2RlbFtdKSA9PiB7XG4gICAgICAgIHRoaXMudHJlZVZpZXcgPSB0cmVlO1xuICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmVlU2VydmljZS5zb3J0VHJlZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XG59XG4iLCIvKlxuIENvcHlyaWdodCAoQykgMjAxOCBZYXJvc2xhdiBLaWtvdFxuIFRoaXMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBsaWNlbnNlLlxuIGh0dHBzOi8vZ2l0aHViLmNvbS9aaWNyYWVsL25neC10cmVlLWRuZFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOZ3hUcmVlU2VydmljZSB9IGZyb20gJy4uL25neC10cmVlLWRuZC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyZWVNb2RlbCwgVHJlZUNvbmZpZywgVHJlZUl0ZW1PcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtdmlldy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZ3gtdHJlZS1jaGlsZHJlbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz0ndHJlZS1jaGlsZCcgaWQ9e3tlbGVtZW50LmlkfX0gbGliRHJhZ0VsZW1lbnQgW2RyYWdnYWJsZVZhbHVlXT0nZWxlbWVudC5vcHRpb25zLmRyYWdnYWJsZScgW2l0ZW1dPSdlbGVtZW50JyBbbmdDbGFzc109XCJ7ZGlzYWJsZWQgOiBlbGVtZW50Lm9wdGlvbnMuZGlzYWJsZWR9XCI+XG4gIDxkaXYgKm5nSWY9XCJlbGVtZW50ICYmIGVsZW1lbnQub3B0aW9uc1wiIGNsYXNzPSdkLWZsZXgnPlxuICAgIDxkaXYgKm5nSWY9J2NvbmZpZycgW25nQ2xhc3NdPVwie2hpZGRlbiA6IGVsZW1lbnQub3B0aW9ucy5oaWRkZW59XCI+XG4gICAgICA8ZGl2IGNsYXNzPSd0cmVlLXRpdGxlIGQtaW5saW5lLWZsZXggcG9zLXJlbGF0aXZlJyBbbmdDbGFzc109XCJ7ZGVzdGVuYXRpb25Ub3AgOiBlbGVtZW50Lm9wdGlvbnMuZGVzdGVuYXRpb25Ub3AsIGRlc3RlbmF0aW9uQm90dG9tOiBlbGVtZW50Lm9wdGlvbnMuZGVzdGVuYXRpb25Cb3R0b219XCIgKm5nSWY9XCIhZWxlbWVudC5vcHRpb25zLmVkaXQ7ZWxzZSBvbkVkaXRcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFjb25maWcuc2V0SXRlbXNBc0xpbmtzOyBlbHNlIGxpbmtcIiBbbmdDbGFzc109XCJ7YWRkT3BhY2l0eSA6IGVsZW1lbnQub3B0aW9ucy5jdXJyZW50bHlEcmFnZ2luZ31cIiBsaWJEcm9wRWxlbWVudFxuICAgICAgICAgIFtpdGVtXT0nZWxlbWVudCcgY2xhc3M9J2RyYWdnYWJsZS1pdGVtJz5cbiAgICAgICAgICB7e2VsZW1lbnQubmFtZX19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctdGVtcGxhdGUgI2xpbms+XG4gICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7YWRkT3BhY2l0eSA6IGVsZW1lbnQub3B0aW9ucy5jdXJyZW50bHlEcmFnZ2luZ31cIiBsaWJEcm9wRWxlbWVudFxuICAgICAgICAgIFtpdGVtXT0nZWxlbWVudCcgY2xhc3M9J2RyYWdnYWJsZS1pdGVtJz5cbiAgICAgICAgICAgIDxhIFtocmVmXT1cImVsZW1lbnQub3B0aW9ucy5ocmVmXCIgY2xhc3M9J3RyZWUtbGluayc+e3tlbGVtZW50Lm5hbWV9fTwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGRpdiBjbGFzcz0nZC1mbGV4IGJ1dHRvbnMtYmFyJyAqbmdJZj1cImNvbmZpZy5zaG93QWN0aW9uQnV0dG9ucyAmJiBlbGVtZW50Lm9wdGlvbnMuc2hvd0FjdGlvbkJ1dHRvbnMgJiYgIWVsZW1lbnQub3B0aW9ucy5kaXNhYmxlZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2QtZmxleCc+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidHJlZS1idG4gYWRkLWJ0blwiICpuZ0lmPVwiY29uZmlnLnNob3dBZGRCdXR0b25zXCIgKGNsaWNrKT1cInN1Ym1pdEFkZChudWxsLCBlbGVtZW50KVwiPlxuICAgICAgICAgICAgICA8ZmEtaWNvbiBpY29uPVwicGx1c1wiIFtzdHlsZS5mb250LXNpemUucHhdPSdjb25maWcuc2V0SWNvblNpemUnPjwvZmEtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2QtZmxleCc+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidHJlZS1idG4gZWRpdC1idG5cIiAqbmdJZj1cImNvbmZpZy5zaG93UmVuYW1lQnV0dG9uc1wiIChjbGljayk9XCJlbGVtZW50Lm9wdGlvbnMuZWRpdCA9IHRydWVcIj5cbiAgICAgICAgICAgICAgPGZhLWljb24gaWNvbj1cImVkaXRcIiBbc3R5bGUuZm9udC1zaXplLnB4XT0nY29uZmlnLnNldEljb25TaXplJz48L2ZhLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdkLWZsZXgnPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRyZWUtYnRuIGRlbGV0ZS1idG5cIiAqbmdJZj1cImNvbmZpZy5zaG93RGVsZXRlQnV0dG9ucyAmJiBlbGVtZW50Lm9wdGlvbnMuc2hvd0RlbGV0ZUJ1dHRvblwiIChjbGljayk9XCJvblN1Ym1pdERlbGV0ZSggZWxlbWVudCApXCI+XG4gICAgICAgICAgICAgIDxmYS1pY29uIGljb249XCJ0aW1lc1wiIFtzdHlsZS5mb250LXNpemUucHhdPSdjb25maWcuc2V0SWNvblNpemUnPjwvZmEtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0nY2hpbGQtZHJvcC1wbGFjZScgW2F0dHIuZGF0YS1pZF09J2VsZW1lbnQuaWQnICBsaWJEcm9wRWxlbWVudCAqbmdJZj0nZWxlbWVudC5vcHRpb25zLnNob3dEcm9wQ2hpbGRab25lICYmICFlbGVtZW50Lm9wdGlvbnMuZGlzYWJsZWQnPlxuICAgICAgICAgIDxmYS1pY29uIGljb249XCJhcnJvdy1kb3duXCIgW3N0eWxlLmZvbnQtc2l6ZS5weF09J2NvbmZpZy5zZXRJY29uU2l6ZSc+PC9mYS1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0nc2hvdy1oaWRlLXN3aXRjaCcgKm5nSWY9XCJjb25maWcuZW5hYmxlRXhwYW5kQnV0dG9ucyAmJiBlbGVtZW50Lm9wdGlvbnMuc2hvd0V4cGFuZEJ1dHRvbiAmJiBlbGVtZW50LmNoaWxkcmVucy5sZW5ndGggPiAwICYmICFlbGVtZW50Lm9wdGlvbnMuZGlzYWJsZWRcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZWxlbWVudC5vcHRpb25zLmhpZGVDaGlsZHJlbnM7IGVsc2UgdmlzaWJsZVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0ndHJlZS1idG4gc2hvdy1idG4nIChjbGljayk9J2VsZW1lbnQub3B0aW9ucy5oaWRlQ2hpbGRyZW5zID0gZmFsc2UnPlxuICAgICAgICAgICAgICA8ZmEtaWNvbiBpY29uPVwicGx1c1wiIFtzdHlsZS5mb250LXNpemUucHhdPSdjb25maWcuc2V0SWNvblNpemUnPjwvZmEtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdmlzaWJsZT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J3RyZWUtYnRuIGhpZGUtYnRuJyAoY2xpY2spPSdlbGVtZW50Lm9wdGlvbnMuaGlkZUNoaWxkcmVucyA9IHRydWUnPlxuICAgICAgICAgICAgICA8ZmEtaWNvbiBpY29uPVwibWludXNcIiBbc3R5bGUuZm9udC1zaXplLnB4XT0nY29uZmlnLnNldEljb25TaXplJz48L2ZhLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLXRlbXBsYXRlICNvbkVkaXQ+XG4gICAgICAgIDxkaXYgY2xhc3M9J3RyZWUtdGl0bGUgZC1pbmxpbmUtZmxleCc+XG4gICAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJyZW5hbWVGb3JtXCIgY2xhc3M9J2QtZmxleCcgKHN1Ym1pdCk9J3N1Ym1pdFJlbmFtZShlbGVtZW50KSc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz0naW5wdXQtcmVuYW1lJyBmb3JtQ29udHJvbE5hbWU9XCJuYW1lXCIgbGliQXV0b0ZvY3VzPVwidHJ1ZVwiIFtzdHlsZS5mb250LXNpemUucHhdPSdjb25maWcuc2V0Rm9udFNpemUnPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdkLWZsZXgnPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0ndHJlZS1idG4gc3VibWl0LWJ0bicgKGNsaWNrKT0nc3VibWl0UmVuYW1lKGVsZW1lbnQpJz5cbiAgICAgICAgICAgICAgPGZhLWljb24gaWNvbj1cImNoZWNrXCIgW3N0eWxlLmZvbnQtc2l6ZS5weF09J2NvbmZpZy5zZXRJY29uU2l6ZSc+PC9mYS1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSd0cmVlLWJ0biBkZWxldGUtYnRuJyAoY2xpY2spPSdvblN1Ym1pdERlbGV0ZShlbGVtZW50KSc+XG4gICAgICAgICAgICAgIDxmYS1pY29uIGljb249XCJ0aW1lc1wiIFtzdHlsZS5mb250LXNpemUucHhdPSdjb25maWcuc2V0SWNvblNpemUnPjwvZmEtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nZXJyb3ItZWRpdC13cmFwJyAqbmdJZj1cInNob3dFcnJvclwiPlxuICAgICAgICAgICAgICB7e2NvbmZpZy52YWxpZGF0aW9uVGV4dH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cInRyZWUtY29udGVudFwiICpuZ0lmPVwiZWxlbWVudC5jaGlsZHJlbnMgJiYgIWVsZW1lbnQub3B0aW9ucy5oaWRlQ2hpbGRyZW5zXCI+XG4gICAgICAgIDxsaWItbmd4LXRyZWUtY2hpbGRyZW4gW3NldEl0ZW1dPVwiY2hpbGRcIiAqbmdGb3I9J2xldCBjaGlsZCBvZiBlbGVtZW50LmNoaWxkcmVucyc+PC9saWItbmd4LXRyZWUtY2hpbGRyZW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTmd4VHJlZUNoaWxkcmVuQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIHNob3dFcnJvcjogYm9vbGVhbjtcbiAgY29uZmlnOiBUcmVlQ29uZmlnO1xuICBlbGVtZW50OiBUcmVlTW9kZWw7XG4gIGRyYWdhYmxlOiBib29sZWFuO1xuICBpdGVtT3B0aW9uczogVHJlZUl0ZW1PcHRpb25zO1xuICBjaGlsZHJlbnNBcnJheTogVHJlZU1vZGVsW107XG4gIHJlbmFtZUZvcm07XG5cbiAgLy8gZ2V0IGl0ZW0gZnJvbSBwYXJlbnQgY29tcG9uZW50XG4gIEBJbnB1dCgpXG4gIHNldCBzZXRJdGVtKGRhdGE6IFRyZWVNb2RlbCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRhdGE7XG4gICAgdGhpcy5pdGVtT3B0aW9ucyA9IHtcbiAgICAgIGhyZWY6ICcjJyxcbiAgICAgIGhpZGRlbjogZmFsc2UsXG4gICAgICBoaWRlQ2hpbGRyZW5zOiBmYWxzZSxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLnRyZWVTZXJ2aWNlLmdldEl0ZW1Qb3NpdGlvbih0aGlzLmVsZW1lbnQpLFxuICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgZWRpdDogZmFsc2UsXG4gICAgICBzaG93QWN0aW9uQnV0dG9uczogdHJ1ZSxcbiAgICAgIGN1cnJlbnRseURyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGRlc3RlbmF0aW9uVG9wOiBmYWxzZSxcbiAgICAgIGRlc3RlbmF0aW9uQm90dG9tOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNob3dFeHBhbmRCdXR0b246IHRydWUsXG4gICAgICBzaG93RGVsZXRlQnV0dG9uOiB0cnVlXG4gICAgfTtcbiAgICBpZiAodGhpcy5lbGVtZW50Lm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucyh0aGlzLmVsZW1lbnQub3B0aW9ucyk7XG4gICAgICB0aGlzLmVsZW1lbnQub3B0aW9ucyA9IHRoaXMuaXRlbU9wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5vcHRpb25zID0gdGhpcy5pdGVtT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBlbmFibGUgc3Vic2NyaWJlcnNcbiAgICB0aGlzLmVuYWJsZVN1YnNjcmliZXJzKCk7XG4gICAgLy8gY3JlYXRlIGZvcm1cbiAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZVNlcnZpY2U6IE5neFRyZWVTZXJ2aWNlLCBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge31cblxuICAvLyBlbmFibGUgc3Vic2NyaWJlIHRvIGNvbmZpZ1xuICBlbmFibGVTdWJzY3JpYmVycygpIHtcbiAgICB0aGlzLnRyZWVTZXJ2aWNlLmNvbmZpZy5zdWJzY3JpYmUoXG4gICAgICAoY29uZmlnKSA9PiB7XG4gICAgICAgIGlmICggY29uZmlnICE9PSBudWxsICkge1xuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy50cmVlU2VydmljZS5kZWZhdWxDb25maWc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5vcHRpb25zLmRyYWdnYWJsZSkge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5vcHRpb25zLmRyYWdnYWJsZSA9IHRoaXMuY29uZmlnLmVuYWJsZURyYWdnaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8vIHNldCBvcHRpb25zIHRvIGl0ZW1cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob3B0aW9ucykpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWUoa2V5LCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgdmFsdWUgdG8gb3B0aW9ucyBrZXlzXG4gIHNldFZhbHVlKGl0ZW0sIG9wdGlvbnMpIHtcbiAgICB0aGlzLml0ZW1PcHRpb25zW2l0ZW1dID0gb3B0aW9uc1tpdGVtXTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBlZGl0IGZvcm1cbiAgY3JlYXRlRm9ybSgpIHtcbiAgICB0aGlzLnJlbmFtZUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIG5hbWU6IFt0aGlzLmVsZW1lbnQubmFtZSB8fCAnJyAsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoIHRoaXMuY29uZmlnLm1pbkNoYXJhY3Rlckxlbmd0aCApXG4gICAgICBdXSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAgRXZlbnQ6IG9uYWRkaXRlbTtcbiAgICBHZW5lcmF0ZSBpZCBieSBuZXcgRGF0ZSgpIGJ5ICdmdWxsIHllYXIgKyBkYXkgKyB0aW1lJy5cbiAgICBDYWxsIGFkZE5ld0l0ZW0oKSBmcm9tIHRyZWUgc2VydmljZS5cbiAgKi9cbiAgc3VibWl0QWRkKG5hbWUsIGl0ZW0gKSB7XG4gICAgICBjb25zdCBkID0gYCR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSR7bmV3IERhdGUoKS5nZXREYXkoKX0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG4gICAgICBjb25zdCBlbGVtSWQgPSAgcGFyc2VJbnQoZCwgbnVsbCk7XG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLmFkZE5ld0l0ZW0oZWxlbUlkLCBuYW1lLCBpdGVtKTtcbiAgICAgIHRoaXMuZWxlbWVudC5vcHRpb25zLmhpZGVDaGlsZHJlbnMgPSBmYWxzZTtcbiAgfVxuXG4gIC8qXG4gICAgRXZlbnQ6IG9ucmVuYW1laXRlbTtcbiAgICBDaGVjayBpcyBmb3JtIHZhbGlkLlxuICAgIENhbGwgYWRkTmV3SXRlbSgpIGZyb20gdHJlZSBzZXJ2aWNlLlxuICAqL1xuICBzdWJtaXRSZW5hbWUoIGl0ZW0gKSB7XG4gICAgaWYgKHRoaXMucmVuYW1lRm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcbiAgICAgIHRoaXMudHJlZVNlcnZpY2UucmVuYW1lSXRlbSh0aGlzLnJlbmFtZUZvcm0udmFsdWUubmFtZSwgaXRlbS5pZCk7XG4gICAgICB0aGlzLmVsZW1lbnQub3B0aW9ucy5lZGl0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0Vycm9yID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgIEV2ZW50OiBvbnJlbW92ZWl0ZW07XG4gICAgQ2hlY2sgaXMgaXRlbSBlZGl0LCB0aGVuIGlmIG5hbWUgZW1wdHkgZGVsZXRlIGl0ZW0uXG4gICAgQ2FsbCBkZWxldGVJdGVtKCkgZnJvbSB0cmVlIHNlcnZpY2UuXG4gICovXG4gIG9uU3VibWl0RGVsZXRlKGl0ZW0pIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5vcHRpb25zLmVkaXQpIHtcbiAgICAgIHRoaXMudHJlZVNlcnZpY2UuZGVsZXRlSXRlbShpdGVtLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCBpdGVtLm5hbWUgPT09IG51bGwgKSB7XG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZGVsZXRlSXRlbShpdGVtLmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5vcHRpb25zLmVkaXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBhZnRlciB2aWV3IGluaXRcbiAgbmdBZnRlclZpZXdJbml0KCkge31cbn1cbiIsIi8qXG4gQ29weXJpZ2h0IChDKSAyMDE4IFlhcm9zbGF2IEtpa290XG4gVGhpcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UuXG4gaHR0cHM6Ly9naXRodWIuY29tL1ppY3JhZWwvbmd4LXRyZWUtZG5kXG4qL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2xpYkF1dG9Gb2N1c10nXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Gb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBmb2N1cyA9IHRydWU7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1cykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgYXV0b2ZvY3VzKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZvY3VzID0gY29uZGl0aW9uICE9PSBmYWxzZTtcbiAgICB9XG59XG4iLCIvKlxuIENvcHlyaWdodCAoQykgMjAxOCBZYXJvc2xhdiBLaWtvdFxuIFRoaXMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBsaWNlbnNlLlxuIGh0dHBzOi8vZ2l0aHViLmNvbS9aaWNyYWVsL25neC10cmVlLWRuZFxuKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgTmd4VHJlZVNlcnZpY2UgfSBmcm9tICcuLi9uZ3gtdHJlZS1kbmQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJEcmFnRWxlbWVudF0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdFbGVtZW50c0RpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSAgdHJlZVNlcnZpY2U6IE5neFRyZWVTZXJ2aWNlKSB7fVxuICAgIEBJbnB1dCgpIGl0ZW06IFRyZWVNb2RlbDtcbiAgICBASW5wdXQoKSBkcmFnZ2FibGVWYWx1ZTogYm9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZygnZHJhZ2dhYmxlJylcbiAgICBnZXQgZHJhZ2dhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVWYWx1ZTtcbiAgICAgfVxuXG4gICAgLypcbiAgICAgICAgRXZlbnQ6IG9uZHJhZ3N0YXJ0O1xuICAgICAgICBTZXQgaXRlbSBhcyBkcmFnZ2luZyBhbmQgY2FsbCBzdGFydERyYWdnaW5nKCkgZnJvbSB0cmVlIHNlcnZpY2UuXG4gICAgICAgIEVtaXQgT25EcmFnU3RhcnQgb24gdHJlZSBzZXJ2aWNlLlxuICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgICBvbkRyYWdTdGFydChldmVudDogRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2ZW50T2JqID0ge1xuICAgICAgICBldmVudCxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLml0ZW1cbiAgICAgIH07XG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLmlzRHJhZ2dpbmcgPSB0aGlzLml0ZW07XG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLmxhc3RFeHBhbmRTdGF0ZSA9IHRoaXMuaXRlbS5vcHRpb25zLmhpZGVDaGlsZHJlbnM7XG4gICAgICB0aGlzLml0ZW0ub3B0aW9ucy5oaWRlQ2hpbGRyZW5zID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXRlbS5vcHRpb25zLmN1cnJlbnRseURyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIC8vIGNhbGwgc2VydmljZSBmdW5jXG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLnN0YXJ0RHJhZ2dpbmcoZXZlbnRPYmopO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgRXZlbnQ6IG9uRHJhZztcbiAgICAgICAgdHJpZ2dlciBkcmFnIGl0ZW1zIGFuZCBjYWxsIG9uRHJhZ1Byb2Nlc3MoKSBmcm9tIHRyZWUgc2VydmljZS5cbiAgICAgICAgRW1pdCBPbkRyYWcgb24gdHJlZSBzZXJ2aWNlLlxuICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZycsIFsnJGV2ZW50J10pXG4gICAgb25EcmFnKGV2ZW50OiBFdmVudCkge1xuICAgICAgY29uc3QgZXZlbnRPYmogPSB7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICB0YXJnZXQ6IHRoaXMuaXRlbVxuICAgICAgfTtcbiAgICAgIHRoaXMudHJlZVNlcnZpY2Uub25EcmFnUHJvY2VzcyhldmVudE9iaik7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgRXZlbnQ6IG9uZHJhZ2VuZDtcbiAgICAgICAgQ2FsbCBkcmFnRW5kQWN0aW9uKCkgZnJvbSB0cmVlIHNlcnZpY2UuXG4gICAgICAgIEVtaXQgT25EcmFnRW5kIG9uIHRyZWUgc2VydmljZS5cbiAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICAgIG9uRHJhZ0VuZChldmVudDogRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2ZW50T2JqID0ge1xuICAgICAgICBldmVudCxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLml0ZW1cbiAgICAgIH07XG4gICAgICB0aGlzLml0ZW0ub3B0aW9ucy5oaWRlQ2hpbGRyZW5zID0gdGhpcy50cmVlU2VydmljZS5sYXN0RXhwYW5kU3RhdGU7XG4gICAgICB0aGlzLml0ZW0ub3B0aW9ucy5jdXJyZW50bHlEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy50cmVlU2VydmljZS5kcmFnRW5kQWN0aW9uKGV2ZW50T2JqKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiIsIi8qXG4gQ29weXJpZ2h0IChDKSAyMDE4IFlhcm9zbGF2IEtpa290XG4gVGhpcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UuXG4gaHR0cHM6Ly9naXRodWIuY29tL1ppY3JhZWwvbmd4LXRyZWUtZG5kXG4qL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBIb3N0QmluZGluZywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgTmd4VHJlZVNlcnZpY2UgfSBmcm9tICcuLi9uZ3gtdHJlZS1kbmQuc2VydmljZSc7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliRHJvcEVsZW1lbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcm9wRWxlbWVudHNEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgIHRyZWVTZXJ2aWNlOiBOZ3hUcmVlU2VydmljZSkge31cbiAgICBASW5wdXQoKSBpdGVtOiBUcmVlTW9kZWw7XG4gICAgQE91dHB1dCgpIGRyb3AgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKlxuICAgICAgICBFdmVudDogb25hbGxvd2Ryb3A7XG4gICAgICAgIENhbGwgb25EcmFnT3ZlcigpIGZyb20gdHJlZSBzZXJ2aWNlLlxuICAgICAgICBFbWl0IG9uQWxsb3dEcm9wIG9uIHRyZWUgc2VydmljZS5cbiAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgICBvbkRyYWdPdmVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zdCBldmVudE9iaiA9IHtcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLml0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5vbkRyYWdPdmVyKGV2ZW50T2JqKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgLypcbiAgICAgICAgRXZlbnQ6IG9uZHJvcDtcbiAgICAgICAgQ2FsbCBvbkRyb3BJdGVtKCkgZnJvbSB0cmVlIHNlcnZpY2UuXG4gICAgICAgIEVtaXQgT25Ecm9wIG9uIHRyZWUgc2VydmljZS5cbiAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIG9uRHJvcChldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLnRyZWVTZXJ2aWNlLmlzRHJhZ2dpbmc7XG4gICAgICAgIGNvbnN0IGV2ZW50T2JqID0ge1xuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuaXRlbVxuICAgICAgICB9O1xuICAgICAgICBkcmFnSXRlbS5vcHRpb25zLmhpZGVDaGlsZHJlbnMgPSB0aGlzLnRyZWVTZXJ2aWNlLmxhc3RFeHBhbmRTdGF0ZTtcbiAgICAgICAgZHJhZ0l0ZW0ub3B0aW9ucy5jdXJyZW50bHlEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAoZHJhZ0l0ZW0gIT09IGV2ZW50T2JqLnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5vbkRyb3BJdGVtKGV2ZW50T2JqKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qc1xuICAgIEV2ZW50OiBvbmRyYWdlbnRlcjtcbiAgICBEZXRlY3QgZXZlbnQgd2hlcmUgZHJhZ2dhYmxlIGVsZW1lbnQgZW50ZXIgaW4gZHJvcCB6b25lLlxuICAgIENhbGwgZW50ZXJEcm9wWm9uZSgpIGZyb20gdHJlZSBzZXJ2aWNlLlxuICAgIEVtaXQgb25EcmFnRW50ZXIuXG4gICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnZW50ZXInLCBbJyRldmVudCddKVxuICAgIG9uRHJhZ0VudGVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zdCBldmVudE9iaiA9IHtcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHRhcmdldDogdGhpcy5pdGVtXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZW50ZXJEcm9wWm9uZShldmVudE9iaik7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgRXZlbnQ6IG9uZHJhZ2xlYXZlO1xuICAgICAgICBEZXRlY3QgZXZlbnQgd2hlcmUgZHJhZ2dhYmxlIGVsZW1lbnQgbGVhdmUgZHJvcCB6b25lLlxuICAgICAgICBDYWxsIGxlYXZlRHJvcFpvbmUoKSBmcm9tIHRyZWUgc2VydmljZS5cbiAgICAgICAgRW1pdCBvbkRyYWdMZWF2ZS5cbiAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gICAgb25EcmFnTGVhdmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIC8vIGVtaXQgZXZlbnRzXG4gICAgICAgIGNvbnN0IGV2ZW50T2JqID0ge1xuICAgICAgICBldmVudCxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLml0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gY29kZVxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmxlYXZlRHJvcFpvbmUoZXZlbnRPYmopO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEF1dG9Gb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdHJlZS1kbmQtYXV0b2ZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnRWxlbWVudHNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LXRyZWUtZG5kLWRyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyb3BFbGVtZW50c0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdHJlZS1kbmQtZHJvcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VHJlZVBhcmVudENvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRyZWUtZG5kLXBhcmVudC9uZ3gtdHJlZS1kbmQtcGFyZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUcmVlQ2hpbGRyZW5Db21wb25lbnQgfSBmcm9tICcuL25neC10cmVlLWRuZC1jaGlsZHJlbi9uZ3gtdHJlZS1kbmQtY2hpbGRyZW4uY29tcG9uZW50JztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgbGlicmFyeSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYUNvZmZlZSwgZmFQbHVzLCBmYUVkaXQsIGZhTWludXMsIGZhVGltZXMsIGZhQ2hlY2ssIGZhQXJyb3dEb3duIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcblxubGlicmFyeS5hZGQoZmFDb2ZmZWUsIGZhUGx1cywgZmFFZGl0LCBmYU1pbnVzLCBmYVRpbWVzLCBmYUNoZWNrLCBmYUFycm93RG93biApO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9udEF3ZXNvbWVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXV0b0ZvY3VzRGlyZWN0aXZlLFxuICAgIERyYWdFbGVtZW50c0RpcmVjdGl2ZSxcbiAgICBEcm9wRWxlbWVudHNEaXJlY3RpdmUsXG4gICAgTmd4VHJlZVBhcmVudENvbXBvbmVudCxcbiAgICBOZ3hUcmVlQ2hpbGRyZW5Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEF1dG9Gb2N1c0RpcmVjdGl2ZSxcbiAgICBEcmFnRWxlbWVudHNEaXJlY3RpdmUsXG4gICAgRHJvcEVsZW1lbnRzRGlyZWN0aXZlLFxuICAgIE5neFRyZWVQYXJlbnRDb21wb25lbnQsXG4gICAgTmd4VHJlZUNoaWxkcmVuQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VHJlZURuZE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQWtDRTsyQkFyQjJCLEVBQUU7MkJBUWYsSUFBSSxPQUFPLEVBQU87MkJBQ2xCLElBQUksT0FBTyxFQUFPOzJCQUNsQixJQUFJLE9BQU8sRUFBTztzQkFDdkIsSUFBSSxPQUFPLEVBQU87c0JBQ2xCLElBQUksT0FBTyxFQUFPOzJCQUNiLElBQUksT0FBTyxFQUFPO3lCQUNwQixJQUFJLE9BQU8sRUFBTzt5QkFDbEIsSUFBSSxPQUFPLEVBQU87NEJBQ2YsSUFBSSxPQUFPLEVBQU87NEJBQ2xCLElB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

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div>\n  <lib-ngx-tree-component [treeData]='myTree' (ondrop)='onDrop($event)' [config]='config'>\n  </lib-ngx-tree-component>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.config = {
            showActionButtons: true,
            showAddButtons: true,
            showRenameButtons: true,
            showDeleteButtons: true,
            enableExpandButtons: true,
            enableDragging: true,
            rootTitle: 'My Tree',
            validationText: 'need valid',
            minCharacterLength: 7,
            setItemsAsLinks: false,
            setFontSize: 24,
            setIconSize: 16
        };
        this.myTree = [
            {
                name: 'item - 1',
                id: 123,
                options: {
                    href: 'FFFFFFFFFFF',
                    showActionButtons: true,
                    showDropChildZone: false,
                    showExpandButton: true,
                    draggable: false,
                    disabled: false,
                    hideChildrens: false,
                },
                childrens: [
                    {
                        name: 'child - item - 1',
                        id: 456,
                        options: {},
                        childrens: [
                            {
                                name: 'deep - item - 1',
                                id: 1222,
                                options: {},
                                childrens: []
                            },
                        ]
                    },
                ]
            },
            {
                name: 'item - 2',
                id: 1533,
                options: {},
                childrens: []
            },
            {
                name: 'item - 3',
                id: 9683,
                options: {},
                childrens: []
            }
        ];
    }
    AppComponent.prototype.onDrop = function (event) {
        console.log(this.myTree);
        console.log(event);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dist_ngx_tree_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dist/ngx-tree-dnd */ "./dist/ngx-tree-dnd/fesm5/ngx-tree-dnd.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _dist_ngx_tree_dnd__WEBPACK_IMPORTED_MODULE_2__["NgxTreeDndModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/zicrael/Soft/Projects/ngx-tree-dnd/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map