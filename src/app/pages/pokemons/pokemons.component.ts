import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { Pokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { toSignal, } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {

  public currentName = signal('Camilo');

  private pokemonsSevice = inject(PokemonsService);
  public pokemons = signal<Pokemon[]>([])

  private route = inject(ActivatedRoute);

  private title = inject(Title);

  public currentPage = toSignal(
    this.route.params.pipe(
      map( params => params['page'] ?? '1' ),
      map( page => ( isNaN(+page) ? 1 : +page )),
      map ( page => Math.max(1, page) )
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage())
  })


  loadPokemons( page: number = 0 ) {
    this.pokemonsSevice.loadPage(page)
      .pipe(
        // tap( () => this.router.navigate([], { queryParams: { page: page } }) ),
        tap( () => this.title.setTitle(`Pokemons SSR - Page ${ page }`) )
      )
      .subscribe(pokemons => this.pokemons.set(pokemons))
  }

}
