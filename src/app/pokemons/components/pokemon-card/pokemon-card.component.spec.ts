import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { Pokemon } from '../../interfaces';

const mockPokemon: Pokemon = {
  id: '1',
  name: 'bulbasaur'
};

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PokemonCardComponent ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Pokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual( mockPokemon );
  });

  it('should render the pokemon name and image correctly', () => {
    const pokeImage = compiled.querySelector('img')!;
    expect( pokeImage ).toBeDefined();

    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ mockPokemon.id }.png`;
    expect(pokeImage.src).toBe(imgUrl);

    const pokeName = compiled.querySelector('h2')!;
    expect( pokeName ).toBeDefined();
    expect(pokeName.innerHTML.trim()).toBe( mockPokemon.name.trim() );
  });


  //! para la version 20 no viene el ng-reflect-router-link
  // it('should have the proper ng-reflect-router-link', () => {
  //   console.log(compiled);
  //   expect(component).toBeTruthy();
  // });

});
