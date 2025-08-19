import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('App Routes', () => {

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" and redirect to /about', async() => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "pokemons/page/1" and redirect to /pokemons/page/1', async() => {
    await router.navigate(['pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should navigate to "unknown-page" and redirect to /about', async() => {
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/about');
  });

  it('should load the proper component', async () => {
    const aboutRoute = routes.find( (route) => route.path === 'about' )!;
    expect(aboutRoute).toBeDefined();
    const aboutComponent = await aboutRoute.loadComponent!() as any;
    const name = aboutComponent.default.name.replace( /\d+$/, '' );
    expect( name ).toBe( 'About' );

    //pokemon page route
    const pokemonRoute = routes.find( (route) => route.path === 'pokemons/page/:page' )!;
    expect(pokemonRoute).toBeDefined();
    const pokemonComponent = await pokemonRoute.loadComponent!() as any;
    const namePoke = pokemonComponent.default.name.replace( /\d+$/, '' );
    expect( namePoke ).toBe( 'PokemonsComponent' );

  })
})
