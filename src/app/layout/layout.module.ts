import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '../shared/shared.module';
import {SidenavListComponent} from './sidenav-list/sidenav-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidenavListComponent],
  exports: [
    SidenavListComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
  ]
})
export class LayoutModule {
}
