/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
*/
import { Directive, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { TreeModel } from '../models/tree-view.model';
import { NgxTreeService } from '../ngx-tree-dnd.service';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[libDropElement]'
})
export class DropElementsDirective {

    private dropSubscription: Subscription;

    constructor(private el: ElementRef, private  treeService: NgxTreeService, private zone: NgZone) {
        
    }

    @Input() item: TreeModel;
    @Output() drop = new EventEmitter();


    ngOnInit() {
        const self = this;
        this.zone.runOutsideAngular(() => {
            self.initSubscriptions(self, self.el.nativeElement);
        });
    }

    initSubscriptions(self, nativeElement) {
        self.dropSubscription = fromEvent(nativeElement, 'dragenter', { passive: false }).subscribe(event => self.onDragEnter(event as Event));
        self.dropSubscription.add(fromEvent(nativeElement, 'dragleave', { passive: false }).subscribe(event => self.onDragLeave(event as Event)));
        self.dropSubscription.add(fromEvent(self.el.nativeElement, 'drop', { passive: false }).subscribe(event => self.onDrop(event as Event)));
        self.dropSubscription.add(fromEvent(self.el.nativeElement, 'dragover', { passive: false }).subscribe(event => self.onDragOver(event as Event)));
    }

    /*
        Event: onallowdrop;
        Call onDragOver() from tree service.
        Emit onAllowDrop on tree service.
    */
    onDragOver(event: Event) {
        const eventObj = {
            event,
            target: this.item
        };
        this.treeService.onDragOver(eventObj);
        event.preventDefault();
    }
    /*
        Event: ondrop;
        Call onDropItem() from tree service.
        Emit OnDrop on tree service.
    */
    onDrop(event: Event) {
        const dragItem = this.treeService.isDragging;
        const eventObj = {
            event,
            target: this.item
        };
        dragItem.options.hideChildrens = this.treeService.lastExpandState;
        dragItem.options.currentlyDragging = false;
        if (dragItem !== eventObj.target) {
            this.treeService.onDropItem(eventObj);
        }
        event.preventDefault();
    }

    /*s
    Event: ondragenter;
    Detect event where draggable element enter in drop zone.
    Call enterDropZone() from tree service.
    Emit onDragEnter.
    */
    onDragEnter(event: Event) {
        const eventObj = {
        event,
        target: this.item
        };
        this.treeService.enterDropZone(eventObj);
    }

    /*
        Event: ondragleave;
        Detect event where draggable element leave drop zone.
        Call leaveDropZone() from tree service.
        Emit onDragLeave.
    */
    onDragLeave(event: Event) {
        // emit events
        const eventObj = {
        event,
        target: this.item
        };
        // code
        this.treeService.leaveDropZone(eventObj);
    }

    ngOnDestroy() {
        if(this.dropSubscription){
            this.dropSubscription.unsubscribe();
            this.dropSubscription = null;
        }
    }
}
