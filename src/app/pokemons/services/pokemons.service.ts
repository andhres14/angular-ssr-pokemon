import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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
    return this.http.get<PokemonResume>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
  }
}
