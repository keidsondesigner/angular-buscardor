import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/livros.interface';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  // https://www.googleapis.com/books/v1/volumes?q=search+terms

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap(dados => console.log('Service, dados api', dados)),
      map(resultado => resultado.items),
      tap(resultado => console.log('Service, resultado após o map', resultado))
    )
  }
}
