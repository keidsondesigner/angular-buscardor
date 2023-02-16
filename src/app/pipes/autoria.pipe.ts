import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  transform(autores: string[]): string {
    if(autores){
      return autores[0];
    }
    return '';
  }
}
