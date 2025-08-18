import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { Pokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal, } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {

  public currentName = signal('Camilo');

  private pokemonsSevice = inject(PokemonsService);
  public pokemons = signal<Pokemon[]>([])

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);


  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1' ),
      map( page => ( isNaN(+page) ? 1 : +page )),
      map ( page => Math.max(1, page) )
    )
  );

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable => console.log(isStable))

  ngOnInit(): void {
    this.loadPokemons();
    //en modo stable
    //   setTimeout(() => {
    //     this.isLoading.set(false);
    //   }, 5000);
  }

  loadPokemons( page: number = 0 ) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsSevice.loadPage(pageToLoad)
      .pipe(
        tap( () => this.router.navigate([], { queryParams: { page: pageToLoad } }) ),
        tap( () => this.title.setTitle(`Pokemons SSR - Page ${ pageToLoad }`) )
      )
      .subscribe(pokemons => this.pokemons.set(pokemons))
  }


  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
