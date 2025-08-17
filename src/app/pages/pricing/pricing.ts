import { ChangeDetectionStrategy,Component,inject,OnInit,PLATFORM_ID } from '@angular/core';
import { Meta,Title } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Pricing implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit() {
    // if( isPlatformServer(this.platform) ) {
    //   document.title = 'Pricing Page';
    // }

    // document.title = 'Pricing Page';
    //console.log(`Hola 'Mundo'`);
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Este es mi Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Andres,Buitrago,About,PRO' });
  }
}
