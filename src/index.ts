import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTreeComponent } from './ngx-tree-dnd.component';
import { NgxTreeChildrenComponent } from './ngx-tree-dnd-children.component';
import { NgxTreeDirective } from './ngx-tree-dnd.directive';
import { NgxTreePipe } from './ngx-tree-dnd.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTreeService } from './ngx-tree-dnd.service';
import { FormBuilder } from '@angular/forms';

export * from './ngx-tree-dnd.component';
export * from './ngx-tree-dnd.directive';
export * from './ngx-tree-dnd.pipe';
export * from './ngx-tree-dnd.service';

@NgModule({
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
})
export class NgxTreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxTreeModule,
      providers: [NgxTreeService, FormBuilder]
    };
  }
}
