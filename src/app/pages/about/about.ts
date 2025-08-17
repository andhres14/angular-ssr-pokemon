import { ChangeDetectionStrategy,Component,inject,OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class About implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('About Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi About Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Este es mi About Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Andres,Buitrago,About,PRO' });
  }
}
