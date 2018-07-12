import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirective } from './directives/ngx-tree-dnd-autofocus.directive';
import { DragElementsDirective } from './directives/ngx-tree-dnd-drag.directive';
import { DropElementsDirective } from './directives/ngx-tree-dnd-drop.directive';
import { NgxTreeParentComponent } from './ngx-tree-dnd-parent/ngx-tree-dnd-parent.component';
import { NgxTreeChildrenComponent } from './ngx-tree-dnd-children/ngx-tree-dnd-children.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faPlus, faEdit, faMinus, faTimes, faCheck, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faPlus, faEdit, faMinus, faTimes, faCheck, faArrowDown );

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
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
})
export class NgxTreeDndModule { }
