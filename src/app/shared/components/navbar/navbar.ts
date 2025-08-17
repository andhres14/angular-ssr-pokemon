import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {

}
