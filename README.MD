# ngx-tree-dnd  [![npm version](https://badge.fury.io/js/ngx-tree-dnd.svg)](https://badge.fury.io/js/ngx-tree-dnd) [![npm downloads](https://img.shields.io/npm/dt/ngx-tree-dnd.svg)](https://www.npmjs.com/package/ngx-tree-dnd)

Angular 6 support tree with drag-and-drop sortable data tree. It`s fast and smart.

[![Dependency Status](https://david-dm.org/zicrael/ngx-tree-dnd.svg)](https://david-dm.org/zicrael/ngx-tree-dnd)  [![Build status](https://api.travis-ci.org/Zicrael/ngx-tree-dnd.svg?branch=master)](https://travis-ci.org/Zicrael/ngx-tree-dnd) [![Known Vulnerabilities](https://snyk.io/test/github/zicrael/ngx-tree-dnd/badge.svg?targetFile=package.json)](https://snyk.io/test/github/zicrael/ngx-tree-dnd?targetFile=package.json) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zicrael/ngx-tree-dnd/blob/master/LICENSE)

## Installation
New ngx-tree-dnd with draggable/sortable tree data, easy for use.

To install library, run:

```bash
$ npm install ngx-tree-dnd --save
```

## Import NgxTreeModule module

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
    NgxTreeModule   // add  NgxTreeModule to imports
    LibraryModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once library is imported, you can use it`s components, directives and pipes in your Angular application:

```xml
<h1>
  {{title}}
</h1>
<ngx-tree-component [treeData]='myTree'></ngx-tree-component>
```

## Styles

You need to import default styles for tree ( you can change them by rewrite classes )

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

## NGX-TREE-DND DOCS

With the development of the plug-in docs will be replenished. So do not forget update the packadge.

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
    // item options
    href?: string;
    hidden?: boolean;
    hideChildrens?: boolean;
    draggable?: boolean;
    position?: number;
    edit?: boolean;
    disabled?: boolean;
    // item buttons
    showDropChildZone?: boolean;
    showActionButtons?: boolean;
    showDeleteButton?: boolean;
    showExpandButton?: boolean;
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

### ondragenter()
Trigger if draggable element enter to drop zone.

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (ondragenter)='onDragEnter($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onDragEnter(event) {
    console.log(event);
  }
```

### ondragleave()
Trigger if draggable element enter to drop zone.

#### example 

in you template file:

```xml
<ngx-tree-component [treeData]='youTree' (ondragleave)='onDragLeave($event)'> </ngx-tree-component>
```
in you component file:

```typescript
    onDragLeave(event) {
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
      showActionButtons: true, // show/hide action buttons for all elements
      showAddButtons: true, // show/hide add button for all elements
      showRenameButtons: true, // show/hide rename buttons for all elements
      showDeleteButtons: true, // show/hide delete buttons for all elements
      enableExpandButtons: true, // // show/hide expand buttons for all elements
      enableDragging: true, // enable/disable dragging
      rootTitle: 'Root', // Tree titile name
      validationText: 'Enter valid name', // form validation text 
      minCharacterLength: 1, // minimum valid chars
      setItemsAsLinks: false, // set tree as <a> link-items, use 'href' option for set link.
      setFontSize: 16, // font-size of items in tree.
      setIconSize: 14 // font-size of font-awesome icons inside buttons.
    }
```

### 4. Items options

You can change items options by set 'options' key on item object.

#### example 

in you component file:

```typescript
    youTree = [
      {
        name: 'google.com',
        id: 777,
        options: {
            // item options
            href: 'google.com', // item href for <a> , use if you set 'setItemsAsLinks: true' in config.
            hidden: 'false', // hide element without removing from data array.
            hideChildrens: false, // hide childrens of element.
            draggable: true, // allow block dragging single element if set 'enableDragging: true'
            position: 1,  // set position of item for sort tree.
            disabled: false, // disaled buttons and add opacity to element.
            // buttons
            showActionButtons: true, // show/hide  action buttons for element.
            showDeleteButton: true, // if 'false' element cannot be deleted.
            showExpandButton: true // show/hide expand buttons for element.
        }
        childrens: []
      }
    ];
```

### 5. Styles

  You can rewrite all styles like you want. Here some for example:

```css
  /* ===Tree items=== */
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
  /* ===Form=== */
  .input-rename {
    /* change styles for input name/rename  */
  }
  /* ===Buttons=== */
  .tree-btn {
    /*  used in all tree buttons  */
  }
  .add-btn {
      /*  styles for add button  */
  }
  .submit-btn {
      /*  styles for submit button  */
  }
  .edit-btn {
      /*  styles for edit button  */
  }
  .delete-btn {
      /*  styles for delete button  */
  }
  .show-btn {
      /*  styles for show expand button  */
  }
  .hide-btn {
      /*  styles for hide expand button  */
  }
```

### Thank you for use my plug-in! Subscribe for more plugins! :)  

[![support on patreon](https://maggiederrick.files.wordpress.com/2017/12/patreon.png)](https://www.patreon.com/zicrael)

Twitch: https://www.twitch.tv/zicrael

Made with love by Zicrael(Yaroslav Kikot) ^^

## License

MIT © [Yaroslav Kikot](mailto:13ccdd@gmail.com)
