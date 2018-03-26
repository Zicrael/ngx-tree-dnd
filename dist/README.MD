# ngx-tree-dnd  [![npm version](https://badge.fury.io/js/ngx-tree-dnd.svg)](https://badge.fury.io/js/ngx-tree-dnd) [![npm monthly downloads](https://img.shields.io/npm/dm/ngx-tree-dnd.svg?style=flat-square)](https://www.npmjs.com/package/ngx-tree-dnd) [![Dependency Status](https://david-dm.org/zicrael/ngx-tree-dnd.svg)](https://david-dm.org/zicrael/ngx-tree-dnd)

Angular 5 support tree with drag-and-drop, no dependencies, AoT compilation. Its simple and fast.

## Installation

To install library, run:

```bash
$ npm install ngx-tree-dnd --save
```

## Import NgxTreeModule module

Import DndModule.forRoot() in the NgModule of your application. The forRoot method is a convention
for modules that provide a singleton service.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxTreeModule } from 'ngx-tree-dnd'; // here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxTreeModule.forRoot() // and import here, do not forget .forRoot()
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<h1>
  {{title}}
</h1>
<ngx-tree-component [treeData]='myTree'></ngx-tree-component>
```

## Styles

You must import default styles for tree ( you can change them by rewrite classes )

```json
"apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico"
      ],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "styles.css",
        "../node_modules/ngx-tree-dnd/styles-tree-dnd.css" 
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ],
```
## NGX-TREE-DND API

With the development of the plug-in API will be replenished. So do not forget update the packadge.

### 1.Set the base tree 

Use [treeData] on ngx-tree-component BUT be careful! 

The interface accepts only the following structure:

```typescript
 export interface TreeModel {
    name: string;
    id: number;
    options?: {};
    childrens: TreeModel[];
}
```

#### Example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree'> </ngx-tree-component>
```

in you component file:

```typescript
  youTree = [
    {
      name: 'first elem',
      id: 1234567890,
      childrens: [
        {
          name: 'first child elem',
          id: 0987654321,
          childrens: []
        }
      ]
    },
  ];
```


### 2.Events

You can trigger events by following code: 

### ondragstart()
Trigger start of dragging element

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (ondragstart)='onDragStart($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onDragStart(event) {
    console.log(event);
  }
```

### onallowdrop()
Trigger start of dragging element

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (onallowdrop)='onAllowDrop($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onAllowDrop(event) {
    console.log(event);
  }
```
### ondrop()
Trigger start of dragging element

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (ondrop)='onDrop($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onDrop(event) {
    console.log(event);
  }
```

### onadditem()
Trigger start of dragging element

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (onadditem)='onAddItem($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onAddItem(event) {
    console.log(event);
  }
```

### onrenameitem()
Trigger start of dragging element

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (onrenameitem)='onRenameItem($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onRenameItem(event) {
    console.log(event);
  }
```

### onremoveitem()
Trigger start of dragging element

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (onremoveitem)='onRemoveItem($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onRemoveItem(event) {
    console.log(event);
  }
```

### 3.Config

You can enable/disable and set some elements on tree by write simple config: 

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' [config]='config'> </ngx-tree-component>
```
in you component file:

```typescript
    config =  {
      enableDragging: true, // enable / disable dragging elements
      setRootTitle: "I am name of the root title", // set title root name.
      enableShowHideBtns: true,  // enable / disable show/hide tree elements button.
      showItemActionBtns: true, // enable / disable item action buttons.
      showAddRootBtn: true, // enable / disable add root tree button.
      showAddItemButton: true, // enable / disable add children button.
      showRenameButton: true, // enable / disable rename item button.
      showDeleteButton: true, // enable / disable delete item button.
      setErrorValidationText: "I can be change", // set error validate text.
      setMinValidationCountChars: 3 // Set count of name min chars on tree.
    }
```

### 4.Styles

  You can rewrite all styles like you want. Here some for example:

```css
  .tree-child {
      /* you styles */
  }
  .tree-title {
      /* you styles */
  }
  .tree-content {
    /* you styles */
  }
  .btn-add-small, .btn-remove-small, .btn-edit-small, .btn-accept-edit-small {
    /* you styles */
  }
  .input-rename {
    /* you styles */
  }
```

### 5. Thank you for use my plug-in. 

Made with love by Yaroslav Kikot.

## License

MIT © [Yaroslav Kikot](mailto:13ccdd@gmail.com)
