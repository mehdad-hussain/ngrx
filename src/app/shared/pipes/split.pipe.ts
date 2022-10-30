import { Pipe, PipeTransform } from '@angular/core';

import { TypeUtils } from '@shared';

@Pipe({
  name: 'split',
})
export class SplitPipe implements PipeTransform {
  private static readonly DEFAULT_DELIMITER = ' ';

  transform(
    value: string,
    delimiter: string | RegExp = SplitPipe.DEFAULT_DELIMITER,
    limit?: number
  ): Array<string> {
    return TypeUtils.isNullOrUndefined(value)
      ? []
      : value.split(delimiter, limit);
  }
}
