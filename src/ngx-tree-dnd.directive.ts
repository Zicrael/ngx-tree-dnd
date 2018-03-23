/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngxTreeDirective]'
})
export class NgxTreeDirective {

  constructor(private el: ElementRef) {
  }

}
