import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullValue',
})
export class NullValuePipie implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return 'Null';
    } else {
      value;
    }
  }
}
