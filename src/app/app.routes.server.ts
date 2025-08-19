import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
        return [
          { page: '1' },
          { page: '2' }
        ]
    },
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
        return [
          { id: 'aerodactyl' }
        ]
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
