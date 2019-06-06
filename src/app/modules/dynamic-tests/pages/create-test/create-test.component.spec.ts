import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTestComponent} from './create-test.component';
import {SharedModule} from '../../../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NewQuestionComponent} from '../../components/new-question/new-question.component';
import {TestSummaryComponent} from '../../components/test-summary/test-summary.component';
import {DynamicTestService} from '../../../../core/services/dynamic-test.service';

class DynamicTestServiceMock {

}

describe('CreateTestComponent', () => {
  let component: CreateTestComponent;
  let fixture: ComponentFixture<CreateTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [CreateTestComponent, NewQuestionComponent, TestSummaryComponent],
      providers: [
        {provide: DynamicTestService, useClass: DynamicTestServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
