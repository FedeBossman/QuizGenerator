import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    SharedModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
