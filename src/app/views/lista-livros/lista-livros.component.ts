import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { LivrosService } from './../../service/livro.service';
import { Item, Livro, LivrosResultado } from 'src/app/models/livros.interface';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info.model';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  listaLivros: Livro[];

  PAUSA: number = 500;

  mensagemErro: string = '';

  quantidadeLivros: LivrosResultado;

  constructor(private _serviceLivrosService: LivrosService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    tap(() => console.log('Fluxo inical')),
    debounceTime(this.PAUSA),
    filter((valorDigito) => valorDigito.length >= 3),
    switchMap((valorDigitado: string) => this._serviceLivrosService.buscar(valorDigitado)),
    map(resultadoQuantidade => this.quantidadeLivros = resultadoQuantidade),
    map(resultado => resultado.items ?? []),
    map((items) => this.listaLivros = this.itemsLivros(items)),
    catchError(erro => {
      console.log(erro);
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Carregue novamente a página.'))
    }),
    tap(() => console.log('Requsisições ao servidor'))
  );

  // utilizando o map() para manipular os criamos uma "Class LivroVolumeInfo" e utilizando o map(),
  // para retornar apenas as informações, que desejamos exibir na tela;
  itemsLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}
