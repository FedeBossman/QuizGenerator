import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewQuestionComponent} from './new-question.component';
import {SharedModule} from '../../../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NewQuestionComponent', () => {
  let component: NewQuestionComponent;
  let fixture: ComponentFixture<NewQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [NewQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
