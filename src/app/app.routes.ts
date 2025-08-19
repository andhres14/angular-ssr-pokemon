import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'about',
    loadComponent: () => import('./pages/about/about')
  },
  {
    path: 'pokemons/page/:page',
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
    redirectTo: 'about'
  }

];
