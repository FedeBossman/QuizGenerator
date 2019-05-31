import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
