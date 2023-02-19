import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  // Esse pipe pega e retornar o primeiro autor, de um array de strings;
  transform(autores: string[]): string {
    if(autores){
      return autores[0];
    }
    return '';
  }
}
