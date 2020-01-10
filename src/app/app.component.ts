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
    showRootActionButtons: true,
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
    // {
    //   name: 'item - 1',
    //   id: 123,
    //   options: {
    //     href: 'FFFFFFFFFFF',
    //     showActionButtons: true,
    //     showDropChildZone: false,
    //     showExpandButton: true,
    //     draggable: false,
    //     disabled: false,
    //     hideChildrens: false,
    //   },
    //   childrens: [
    //     {
    //       name: 'child - item - 1',
    //       id: 456,
    //       options: {

    //       },
    //       childrens: [
    //         {
    //           name: 'deep - item - 1',
    //           id: 1222,
    //           options: {

    //           },
    //           childrens: []
    //         },
    //       ]
    //     },
    //   ]
    // },
    // {
    //   name: 'item - 2',
    //   id: 1533,
    //   options: {

    //   },
    //   childrens: []
    // },
    // {
    //   name: 'item - 3',
    //   id: 9683,
    //   options: {

    //   },
    //   childrens: []
    // }
  ];

  onDrop(event) {
    console.log(this.myTree);
    console.log(event);
  }
  onStartDelete(event) {
    console.log('on start delete item');
    console.log(this.myTree);
    console.log(event);
  }
  onFinishDelete(event) {
    console.log('on finish delete item');
    console.log(this.myTree);
    console.log(event);
  }
  onCancelDelete(event) {
    console.log('on cancel delete item');
    console.log(this.myTree);
    console.log(event);
  }
  onadditem(event) {
    console.log(this.myTree);
    console.log(event);
  }
  onStartRenameItem(event) {
    console.log('start rename');
    console.log(this.myTree);
    console.log(event);
  }
  onClickItem(event) {
    console.log('click');
    console.log(this.myTree);
    console.log(event);
  }
  onMouseEnterItem(event) {
    console.log('mouse enter');
    console.log(this.myTree);
    console.log(event);
  }
  onMouseLeaveItem(event) {
    console.log('mouse leave');
    console.log(this.myTree);
    console.log(event);
  }
  onFinishRenameItem(event) {
    console.log('finish rename');
    console.log(this.myTree);
    console.log(event);
  }
}
