import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  title = 'test-generator';

  onToggleSidenav() {
    this.sidenav.toggle();
  }

  onNavItemClicked() {
    this.sidenav.close();
  }
}
