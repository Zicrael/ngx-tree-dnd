import { NgxTreeService } from './ngx-tree-dnd.service';

const testTree = [
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
        childrens: []
    },
    {
        name: 'item - 2',
        id: 321,
        options: {
            href: 'FFFFFFFFFFF',
            showActionButtons: true,
            showDropChildZone: false,
            showExpandButton: true,
            draggable: false,
            disabled: false,
            hideChildrens: false,
        },
        childrens: []
      }
  ];

describe('NgxTreeService', () => {
    let service: NgxTreeService;
    beforeEach(() => { service = new NgxTreeService(); });
   
    it('service are defined', () => {
      expect(service).toBeTruthy();
    });
    it('service method getLocalData work fine', (done) => {
        let checkTreeLengthSpy = spyOn(service, 'checkTreeLength');
        service.getLocalData(testTree).subscribe( data => {
            expect(service.treeStorage).toEqual(testTree);
            expect(testTree).toEqual(testTree);
            expect(checkTreeLengthSpy).toHaveBeenCalled();
            done();
        })
    });
    it('service method addNewItem work fine', (done) => {
        const createObj = {
            id: 333,
            name: 'newEl',
            options:  {
              position: 1,
              edit: true
            },
            childrens: []
        };
        const clearActionSpy = spyOn(service, 'clearAction');
        service.onAddItem.subscribe((event) => {
            expect(event.element).toEqual(createObj);
            expect(event.parent).toBe('root');
            done();
        })
        service.addNewItem(333, 'newEl');
        expect(clearActionSpy).toHaveBeenCalled();
    });
    // it('service method deleteItem work fine', (done) => {
    //     let checkTreeLengthSpy = spyOn(service, 'checkTreeLength');
    //     let clearActionSpy = spyOn(service, 'clearAction');
    //     service.onStartDeleteItem.subscribe((event) => {
    //         expect(event.element).toEqual(testTree[0]);
    //         expect(event.parent).toBe('root');
    //         done();
    //     })
    //     service.deleteItem(123);
    //     expect(checkTreeLengthSpy).toHaveBeenCalled();
    //     expect(clearActionSpy).toHaveBeenCalled();
    // });
  });