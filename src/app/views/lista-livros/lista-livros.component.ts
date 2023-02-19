import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { LivrosService } from './../../service/livro.service';
import { Item, Livro } from 'src/app/models/livros.interface';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info.model';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  listaLivros: Livro[];

  constructor(private _serviceLivrosService: LivrosService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    tap(() => console.log('Fluxo inical')),
    switchMap((valorDigitado: string) => this._serviceLivrosService.buscar(valorDigitado)),
    map((items) => this.listaLivros = this.itemsLivros(items)),
    tap(() => console.log('Requsisições ao servidor'))
  )

  // utilizando o map() para manipular os criamos uma "Class LivroVolumeInfo" e utilizando o map(),
  // para retornar apenas as informações, que desejamos exibir na tela;
  itemsLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}
