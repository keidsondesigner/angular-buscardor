import { LivrosService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { Item, Livro } from 'src/app/models/livros.interface';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info.model';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca: string = '';
  listaLivros: Livro[];
  livro: Livro;

  constructor(private serviceLivros: LivrosService) { }

  buscarLivros() {
    this.serviceLivros.buscar(this.campoBusca).subscribe({
      next: (dados) => {
        console.log('Requisiçoes ao servidor');
        this.listaLivros = this.itemsLivros(dados);
      },
      error: erro => console.log(erro)
    })
  }

  // criamos uma "Class LivroVolumeInfo" e utilizando o map(),
  // para retornar apenas as informações, que desejamos exibir na tela;
  itemsLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      console.log('ITEM', item);
      return new LivroVolumeInfo(item);
    })
  }

}
