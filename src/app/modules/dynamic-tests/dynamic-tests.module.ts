import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {DynamicTestsRoutingModule} from './dynamic-tests-routing.module';
import {CreateTestComponent} from './pages/create-test/create-test.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { TestSummaryComponent } from './components/test-summary/test-summary.component';
import { ListTestsComponent } from './pages/list-tests/list-tests.component';

@NgModule({
  declarations: [CreateTestComponent, NewQuestionComponent, TestSummaryComponent, ListTestsComponent],
  imports: [
    SharedModule,
    DynamicTestsRoutingModule
  ]
})
export class DynamicTestsModule {
}
