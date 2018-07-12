/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
*/
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[libAutoFocus]'
})
export class AutoFocusDirective implements OnInit {
    private focus = true;
    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (this.focus) {
            window.setTimeout(() => {
                this.el.nativeElement.focus();
            });
        }
    }

    @Input() set autofocus(condition: boolean) {
        this.focus = condition !== false;
    }
}
