/*
 Copyright (C) 2018 Yaroslav Kikot
 This project is licensed under the terms of the MIT license.
 https://github.com/Zicrael/ngx-tree-dnd
 */
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
