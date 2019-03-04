import { NgxTreeService } from './ngx-tree-dnd.service';

let testTree = [];

describe('NgxTreeService', () => {
    let service: NgxTreeService;
    beforeEach(() => { service = new NgxTreeService(); });
   
    it('service are defined', () => {
      expect(service).toBeTruthy();
    });
    it('service method getLocalData work fine', (done) => {
        service.getLocalData(testTree).subscribe( data => {
            expect(service.treeStorage).toEqual(testTree);
            expect(service.treeStorage).toBeTruthy();
            expect(service.treeStorage).not.toEqual(null);
            expect(testTree).toEqual(testTree);
            done();
        })
    });
    it('service method getLocalData work fine with null tree storage', (done) => {
        testTree = null;
        service.getLocalData(testTree).subscribe( data => {
            expect(service.treeStorage).toBeTruthy();
            expect(service.treeStorage.length).toEqual(0);
            testTree = [];
            expect(testTree).toEqual(testTree);
            done();
        })
    
    });


    it('service method addNewItem work fine without parent', (done) => {
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
    it('service method addNewItem work fine with parent', (done) => {
        const createObj = {
            id: 333,
            name: 'newEl',
            options:  {
              position: 1,
              edit: true
            },
            childrens: []
        };
        const parentObj = {
            id: 333,
            name: 'parentEl',
            options:  {
              position: 1,
              edit: true
            },
            childrens: []
        }
        const clearActionSpy = spyOn(service, 'clearAction');
        service.treeStorage = [parentObj];
        service.onAddItem.subscribe((event) => {
            expect(event.element).toEqual(createObj);
            expect(event.parent).toBe(parentObj);
            done();
        })
        service.addNewItem(333, 'newEl', parentObj);
        // tests required
        expect(clearActionSpy).toHaveBeenCalled();
    });

    // it('service method deleteItem work fine', (done) => {
    //     let clearActionSpy = spyOn(service, 'clearAction');
    //     service.onStartDeleteItem.subscribe((event) => {
    //         expect(event.element).toEqual(testTree[0]);
    //         expect(event.parent).toBe('root');
    //         done();
    //     })
    //     service.deleteItem(123);
    //     expect(clearActionSpy).toHaveBeenCalled();
    // });
  });