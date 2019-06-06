import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {DynamicTestsRoutingModule} from './dynamic-tests-routing.module';
import {CreateTestComponent} from './pages/create-test/create-test.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {TestSummaryComponent} from './components/test-summary/test-summary.component';
import {ListTestsComponent} from './pages/list-tests/list-tests.component';
import {TestsListComponent} from './components/tests-list/tests-list.component';
import {ConfirmDeleteDialogComponent} from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    CreateTestComponent,
    NewQuestionComponent,
    TestSummaryComponent,
    ListTestsComponent,
    TestsListComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    SharedModule,
    DynamicTestsRoutingModule
  ],
  entryComponents: [ConfirmDeleteDialogComponent]
})
export class DynamicTestsModule {
}
