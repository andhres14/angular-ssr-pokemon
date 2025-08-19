import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let compiled: HTMLDivElement;

  /**
   * Creamos mock del componente navbar
   */
  @Component({
    selector: 'app-navbar',
    template: `<h1>Hola mundo</h1>`
  })
  class NavbarMock {}

  beforeEach(async () => {
    // TestBed.overrideComponent(App, {
    //   set: {
    //     imports: [ NavbarMock ],
    //     schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    //   }
    // })
    //! recomendado
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([])
      ]
    }).overrideComponent( App, {
      add: {
        imports: [ NavbarMock ]
      },
      remove: {
        imports: [ Navbar ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLDivElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    expect( compiled.querySelector('app-navbar') ).toBeTruthy();
    expect( compiled.querySelector('router-outlet') ).toBeTruthy();
  });
});
