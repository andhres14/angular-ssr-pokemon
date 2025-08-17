import { ChangeDetectionStrategy,Component,inject,OnInit } from '@angular/core';
import { Meta,Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Contact implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Contact Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Este es mi Contact Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Andres,Buitrago,About,PRO' });
  }
}
