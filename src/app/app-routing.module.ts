import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./modules/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
