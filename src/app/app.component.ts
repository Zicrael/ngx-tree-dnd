import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}
  config = {
    showActionButtons: true,
    showAddButtons: true,
    showRenameButtons: true,
    showDeleteButtons: true,
    enableExpandButtons: true,
    enableDragging: true,
    rootTitle: 'My Tree',
    validationText: 'need valid',
    minCharacterLength: 7,
    setItemsAsLinks: false,
    setFontSize: 24,
    setIconSize: 16
  };
  myTree = [
    {
      name: 'item - 1',
      id: 123,
      options: {
        href: 'FFFFFFFFFFF',
        showActionButtons: true,
        showDropChildZone: false,
        showExpandButton: true,
        draggable: false,
        disabled: false,
        hideChildrens: false,
      },
      childrens: [
        {
          name: 'child - item - 1',
          id: 456,
          options: {

          },
          childrens: [
            {
              name: 'deep - item - 1',
              id: 1222,
              options: {

              },
              childrens: []
            },
          ]
        },
      ]
    },
    {
      name: 'item - 2',
      id: 1533,
      options: {

      },
      childrens: []
    },
    {
      name: 'item - 3',
      id: 9683,
      options: {

      },
      childrens: []
    }
  ];

  onDrop(event) {
    console.log(this.myTree);
    console.log(event);
  }
  onDelete(event) {
    console.log(this.myTree);
    console.log(event);
  }
  onadditem(event) {
    console.log(this.myTree);
    console.log(event);
  }
}
