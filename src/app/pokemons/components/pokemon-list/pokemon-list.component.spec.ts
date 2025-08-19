import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { Pokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: Pokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PokemonListComponent ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemons list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemon-card').length).toBe(2);
  });

  it('should render "No hay pokémons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent).toContain('No hay pokémons');
  });

});
