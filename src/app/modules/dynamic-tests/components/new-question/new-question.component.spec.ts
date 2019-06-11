import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewQuestionComponent} from './new-question.component';
import {SharedModule} from '../../../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Answer} from '../../../../shared/models/answer';
import {QuestionType} from '../../../../shared/models/question-type';

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

  it('should call presenters newAnswer with statement value onAddAnswer', () => {
    component.onAddAnswer();
    expect(component.answers.controls.length).toBe(1);
  });

  it('should call presenters removeAnswer with statement value onRemoveAnswer', () => {
    component.onAddAnswer();
    component.onAddAnswer();
    expect(component.answers.controls.length).toBe(2);
    component.onRemoveAnswer(0);
    expect(component.answers.controls.length).toBe(1);
  });

  it('should call presenters submitQuestion with statement value onSubmitQuestion', () => {
    const spy = spyOn(component.presenter, 'submitQuestion').and.callThrough();
    component.onSubmitQuestion();
    expect(spy).toHaveBeenCalledWith(component.questionForm.getRawValue());
  });
});
