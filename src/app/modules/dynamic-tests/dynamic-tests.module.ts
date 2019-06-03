import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {DynamicTestsRoutingModule} from './dynamic-tests-routing.module';
import {CreateTestComponent} from './pages/create-test/create-test.component';

@NgModule({
  declarations: [CreateTestComponent],
  imports: [
    SharedModule,
    DynamicTestsRoutingModule
  ]
})
export class DynamicTestsModule {
}
