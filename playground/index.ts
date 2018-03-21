/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@Component({
  selector: 'ngx-tree-component',
  template: `<ngx-tree-dnd-component></ngx-tree-dnd-component>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
