import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSelect'
})
export class FormatSelectPipe implements PipeTransform {
  // Не уверен что нужно ставить any. Я конечно могу захотитеть использовать её ещё где-то.
  transform(value: string, options: any[]): string {
    return options.find((option) => option._id === value)?.name || '';
  }
}
