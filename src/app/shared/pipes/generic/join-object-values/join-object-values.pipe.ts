import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinObjectValues',
})
export class JoinObjectValuesPipe implements PipeTransform {
  transform(value: any): any {
    // console.log('Pipe works ', typeof value);
    if (typeof value === 'object') {
      return Object.values(value).join(', ');
      // return Object.keys(value);
    } else {
      return value;
    }
  }
}
