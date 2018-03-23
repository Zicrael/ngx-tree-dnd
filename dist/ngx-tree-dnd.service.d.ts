import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { TreeModel } from './tree-view.model';
export declare class NgxTreeService {
    treeStorage: TreeModel[];
    listOfSelectedElement: TreeModel[];
    selectedElement: TreeModel;
    isDragging: TreeModel;
    onDragStart: Subject<any>;
    onDrop: Subject<any>;
    onAllowDrop: Subject<any>;
    onAddItem: Subject<any>;
    onRenameItem: Subject<any>;
    onRemoveItem: Subject<any>;
    constructor();
    getLocalData(item: any): Observable<{}>;
    elementFinder(list: any, id: any): void;
    addNewItem(id: any, name: any, type: any, parent?: any): void;
    deleteItem(id: any): void;
    renameItem(name: any, id: any): void;
    dropAction(el: any, to: any): boolean;
    dropOnRoot(el: any): void;
    clearAction(): void;
}
