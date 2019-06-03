import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateTestComponent} from './pages/create-test/create-test.component';

const routes: Routes = [
  {path: 'create', component: CreateTestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicTestsRoutingModule { }
