import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngxTreeDirective]'
})
export class NgxTreeDirective {

  constructor(private el: ElementRef) {
  }

}
