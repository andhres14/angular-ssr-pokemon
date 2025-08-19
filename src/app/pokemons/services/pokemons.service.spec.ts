import { TestBed, inject } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokeAPIReponse, Pokemon } from '../interfaces';
import { catchError } from 'rxjs';

const expectedPokemons: Pokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
]

const mockPokemon = {
  id: '1',
  name: 'bulbasaur'
}

const mockPokeApiResponse: PokeAPIReponse = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ]
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject( PokemonsService );
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of Pokemons', () => {

    service.loadPage(1).subscribe( pokemons => {
      expect( pokemons ).toEqual( expectedPokemons );
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a page 5 of Pokemons', () => {

    service.loadPage(5).subscribe( pokemons => {
      expect( pokemons ).toEqual( expectedPokemons );
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=80`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a Pokémon by ID', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe( (pokemon: any) => {
      expect( pokemon ).toEqual( mockPokemon );
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${ pokemonId }`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);

  });

  it('should load a Pokémon by Name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe( (pokemon: any) => {
      expect( pokemon ).toEqual( mockPokemon );
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${ pokemonName }`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);

  });


  // Trigger errors
  it('should catch error if pokemon not found', () => {
    const pokemonName = 'no-existe-pokemon';

    service.loadPokemon(pokemonName)
      .pipe(
        catchError( err => {
          expect( err.message ).toContain('Pokémon not found')
          return [];
        })
      )
      .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${ pokemonName }`
    );

    expect(req.request.method).toBe('GET');
    req.flush('Pokémon not found', {
      status: 404,
      statusText: 'Not Found'
    });

  });


});
