import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTreeDndModule } from 'ngx-tree-dnd';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxTreeDndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
