import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSelect'
})
export class FormatSelectPipe implements PipeTransform {
  transform<T extends {_id: string, name: string}>(value: string, options: readonly T[] | null): string {
    if (!options) return '';

    return options.find((option) => option._id === value)?.name || '';
  }
}
