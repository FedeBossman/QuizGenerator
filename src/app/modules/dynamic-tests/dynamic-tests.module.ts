import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {DynamicTestsRoutingModule} from './dynamic-tests-routing.module';
import {CreateTestComponent} from './pages/create-test/create-test.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';

@NgModule({
  declarations: [CreateTestComponent, NewQuestionComponent],
  imports: [
    SharedModule,
    DynamicTestsRoutingModule
  ]
})
export class DynamicTestsModule {
}
