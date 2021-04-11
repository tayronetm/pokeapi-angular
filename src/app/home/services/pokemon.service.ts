import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Pokemon } from "../models/pokemon";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor(private http: HttpClient) {
  }

  getPokemons(): Observable<Pokemon> {
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Ocorreu um erro", error.error.message);
    } else {
      console.error(
        `Backend retornou ${error.status}, `
      );
    }
    return throwError("Serviço indisponível");
  }


}
