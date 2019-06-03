import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {DynamicTestsRoutingModule} from './dynamic-tests-routing.module';
import {CreateTestComponent} from './pages/create-test/create-test.component';
import { NewFieldComponent } from '../dinamic-tests/components/new-field/new-field.component';

@NgModule({
  declarations: [CreateTestComponent, NewFieldComponent],
  imports: [
    SharedModule,
    DynamicTestsRoutingModule
  ]
})
export class DynamicTestsModule {
}
