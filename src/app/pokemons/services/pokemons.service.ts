import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PokeAPIReponse, Pokemon, PokemonResume } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private http = inject(HttpClient);


  public loadPage( page: number ): Observable<Pokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<PokeAPIReponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${ page * 20 }`
    ).pipe(
      map(resp => {
        const pokemons: Pokemon[] = resp.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }));

        return pokemons;
      })
      // tap( console.log )
    )

  }

  public loadPokemon( id: string ): Observable<PokemonResume> {
    return this.http.get<PokemonResume>(`https://pokeapi.co/api/v2/pokemon/${ id }`)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError( error: HttpErrorResponse ) {
    if (error.status === 0) {
      console.log('An error occurred: ', error.error);
    } else {
      console.log(`Backend returned code ${ error.status }, body: ${ error.error }`);
    }

    const errorMessage = error.error ?? 'An error occurred';
    return throwError(() => new Error(errorMessage))
  }

}
