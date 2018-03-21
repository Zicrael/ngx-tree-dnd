import { Injectable, PipeTransform, Pipe } from '@angular/core';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'NgxTreePipe'
})
@Injectable()
export class NgxTreePipe implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    return value;
  }
}
