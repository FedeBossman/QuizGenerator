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

  it('should call presenters changeStatement with statement value onStatementChange', () => {
    const spy = spyOn(component.presenter, 'changeStatement').and.callThrough();
    component.onStatementChange('statement');
    expect(spy).toHaveBeenCalledWith('statement');
  });

  it('should call presenters changeQuestionType with questionType text value onQuestionTypeChange', () => {
    const spy = spyOn(component.presenter, 'changeQuestionType').and.callThrough();
    component.onQuestionTypeChange(QuestionType.TEXT);
    expect(spy).toHaveBeenCalledWith(QuestionType.TEXT);
  });

  it('should return answer value on trackby', () => {
    const answer = new Answer();
    answer.value = 'abc';
    expect(component.trackAnswers(0, answer)).toBe('abc');
  });

  it('should return undefined when answer is null or undefined', () => {
    const answer = new Answer();
    answer.value = 'abc';
    expect(component.trackAnswers(0, undefined)).toBe(undefined);
  });

  it('should call presenters newAnswer with statement value onAddAnswer', () => {
    const spy = spyOn(component.presenter, 'newAnswer').and.callThrough();
    component.onAddAnswer();
    expect(spy).toHaveBeenCalled();
  });

  it('should call presenters changeStatement with statement value onAnswerChanged', () => {
    const answer = new Answer();
    const spy = spyOn(component.presenter, 'changeAnswer').and.callThrough();
    component.onAnswerChanged('viewValue', answer);
    expect(spy).toHaveBeenCalledWith('viewValue', answer);
  });

  it('should call presenters removeAnswer with statement value onRemoveAnswer', () => {
    const answer = new Answer();
    const spy = spyOn(component.presenter, 'removeAnswer').and.callThrough();
    component.onRemoveAnswer(answer);
    expect(spy).toHaveBeenCalledWith(answer);
  });

  it('should call presenters submitQuestion with statement value onSubmitQuestion', () => {
    const spy = spyOn(component.presenter, 'submitQuestion').and.callThrough();
    component.onSubmitQuestion();
    expect(spy).toHaveBeenCalledWith();
  });
});
