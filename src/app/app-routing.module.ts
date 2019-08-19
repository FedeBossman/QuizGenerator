import {NgModule} from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {ReloadRouteReuseStrategy} from './core/routing/reload-route-reuse-strategy';

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
  {
    path: 'test',
    loadChildren: () =>
      import('./modules/dynamic-tests/dynamic-tests.module').then(m => m.DynamicTestsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [{provide: RouteReuseStrategy, useClass: ReloadRouteReuseStrategy}]
})
export class AppRoutingModule {
}
