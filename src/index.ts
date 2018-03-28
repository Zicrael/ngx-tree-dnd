import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgxTreeComponent } from './ngx-tree-dnd.component';
import { NgxTreeChildrenComponent } from './ngx-tree-dnd-children.component';
import { NgxTreeService } from './ngx-tree-dnd.service';

export * from './ngx-tree-dnd.component';
export * from './ngx-tree-dnd.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    NgxTreeComponent,
    NgxTreeChildrenComponent
  ],
  exports: [
    NgxTreeComponent,
    NgxTreeChildrenComponent
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
