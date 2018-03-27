# ngx-tree-dnd  [![npm version](https://badge.fury.io/js/ngx-tree-dnd.svg)](https://badge.fury.io/js/ngx-tree-dnd) [![npm monthly downloads](https://img.shields.io/npm/dm/ngx-tree-dnd.svg?style=flat-square)](https://www.npmjs.com/package/ngx-tree-dnd) [![Dependency Status](https://david-dm.org/zicrael/ngx-tree-dnd.svg)](https://david-dm.org/zicrael/ngx-tree-dnd) [![Build status](https://api.travis-ci.org/Zicrael/ngx-tree-dnd.svg?branch=master)](https://travis-ci.org/Zicrael/ngx-tree-dnd) 


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

## Demo

Demo with editor: 

[Run on stackblitz.com](https://stackblitz.com/edit/ngx-tree-dnd)

Demo application: 

[Run on stackblitz.com](https://ngx-tree-dnd.stackblitz.io)

## NGX-TREE-DND API

With the development of the plug-in API will be replenished. So do not forget update the packadge.

### 1.Set the base tree 

Use [treeData] on ngx-tree-component BUT be careful! 

The interface accepts only the following structure:

```typescript
 export interface TreeModel {
    name: string; // name of item
    id: number; // id of item
    options?: TreeItemOptions; // options of item
    childrens: TreeModel[]; // childrens list
}
export interface TreeItemOptions {
    href?: string; // href for <a> tag if enable setTreeItemAsLinks on config
    isHidden?: boolean; // hide childrens
    currentlyDragging?: boolean; // enable only where element is drugging.
}
```

#### example 

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

### ondragend()
Trigger end of drag event 
#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (ondragend)='onDragEnd($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onDragEnd(event) {
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

### 3. Config

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
      setMinValidationCountChars: 3, // Set count of name min chars on tree.
      setTreeItemAsLinks: true // set name of items as <a> and set link from item.options.href .
    }
```

### 4. Items options

You can change items options by set 'options' key on item object : 

#### example 

in you component file:

```typescript
    youTree = [
      {
        name: 'first elem',
        id: 1234567890,
        options: {
          href: 'www.google.com', // set href to <a> title if config.setTreeItemAsLinks = true, you can style it by .tree-link class.
          isHidden: true, // hide childrens list element as default, but you can open it if config.enableShowHideBtns = true
          position: 1 // no effect. It will be used on feature versions.
        }
        childrens: []
      },
      {
        name: 'second elem',
        id: 0987654321,
        options: {
          href: 'www.apple.com', // set href to <a> title if config.setTreeItemAsLinks = true, you can style it by .tree-link class.
          isHidden: false, // hide childrens list element as default, but you can open it if config.enableShowHideBtns = true
          position: 2 // no effect. It will be used on feature versions. (But you can use it).
        }
        childrens: []
      }
    ];
```

### 5. Styles

  You can rewrite all styles like you want. Here some for example:

```css
  .tree-child {
    /* change styles for child elements */
  }
  .tree-title {
    /* change styles for items title */
  }
  .tree-content {
    /* change styles for tree.childrens wrapper */
  }
  .tree-link {
    /* change styles for links if  config.setTreeItemAsLinks = true  */
  }
  .btn-add-small, .btn-remove-small, .btn-edit-small, .btn-accept-edit-small {
    /* change styles for buttons if  config.showItemActionBtns = true  */
  }
  .input-rename {
    /* change styles for input name/rename  */
  }
```

### Thank you for use my plug-in. 

Made with love by Yaroslav Kikot.

## License

MIT © [Yaroslav Kikot](mailto:13ccdd@gmail.com)
