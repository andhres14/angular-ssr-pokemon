import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {

}
