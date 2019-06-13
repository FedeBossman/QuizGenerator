import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewQuestionComponent} from './new-question.component';
import {SharedModule} from '../../../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NewQuestionPresenter} from './new-question.presenter';
import {NewQuestionFormService} from './services/new-question-form.service';
import {QuestionType} from '../../../../shared/models/question-type';

describe('NewQuestionComponent', () => {
  let component: NewQuestionComponent;
  let presenter: NewQuestionPresenter;
  let formService: NewQuestionFormService;
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
    presenter = fixture.debugElement.injector.get(NewQuestionPresenter);
    formService = fixture.debugElement.injector.get(NewQuestionFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call presenters newAnswer with statement value onAddAnswer', () => {
    const spy = spyOn(formService, 'addAnswer').and.callThrough();
    spyOnProperty(formService, 'isMultiAnswer').and.returnValue(true);
    component.onAddAnswer();
    expect(component.answers.controls.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call presenters removeAnswer with statement value onRemoveAnswer', () => {
    spyOnProperty(formService, 'isMultiAnswer').and.returnValue(true);
    component.onAddAnswer();
    component.onAddAnswer();
    expect(component.answers.controls.length).toBe(2);
    component.onRemoveAnswer(0);
    expect(component.answers.controls.length).toBe(1);
  });

  it('should call presenters submitQuestion onSubmitQuestion', () => {
    const spy = spyOn(presenter, 'submitQuestion').and.callThrough();
    component.onSubmitQuestion();
    expect(spy).toHaveBeenCalled();
  });
});
