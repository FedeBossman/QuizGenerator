import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateTestComponent} from './pages/create-test/create-test.component';
import {ListTestsComponent} from './pages/list-tests/list-tests.component';

const routes: Routes = [
  {path: 'create', component: CreateTestComponent},
  {path: 'list', component: ListTestsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicTestsRoutingModule { }
