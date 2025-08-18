import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons.component')
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.component')
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing')
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact')
  },
  {
    path: '**',
    redirectTo: 'pokemons'
  }

];
