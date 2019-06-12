import { NewQuestionPresenter } from './new-question.presenter';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NewQuestionFormService} from './services/new-question-form.service';
import {FormBuilder} from '@angular/forms';
import {NewQuestionFormValidatorsService} from './services/new-question-form-validators.service';
import {QuestionType} from '../../../../shared/models/question-type';

describe('NewQuestionPresenter', () => {
  let formService: NewQuestionFormService;
  let formBuilder: FormBuilder;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [NewQuestionPresenter, NewQuestionFormService, FormBuilder, NewQuestionFormValidatorsService]
  }));

  beforeEach(() => {
    formService = TestBed.get(NewQuestionFormService);
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should be created', () => {
    const service: NewQuestionPresenter = TestBed.get(NewQuestionPresenter);
    expect(service).toBeTruthy();
  });


  it('should not reset form if the form is not valid', (() => {
    const presenter: NewQuestionPresenter = TestBed.get(NewQuestionPresenter);
    const spy = spyOn(formService, 'resetForm').and.callThrough();
    presenter.submitQuestion();
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should emit a Question when calling submitQuestion', fakeAsync(() => {
    const presenter: NewQuestionPresenter = TestBed.get(NewQuestionPresenter);
    formService.questionForm.patchValue({
      statement: 'TestQuestion',
      questionType: QuestionType.MULTI
    });
    formService.answers.push(formBuilder.control('answer1'));
    formService.answers.push(formBuilder.control('answer2'));

    let answers = null;
    presenter.submitQuestion$.subscribe(question => {
      answers = question.answers;
    });
    presenter.submitQuestion();
    tick();
    expect(answers.length).toBe(2);
    expect(answers[0].viewValue).toBe('answer1');

    formService.questionForm.patchValue({
      statement: 'TestQuestion',
      questionType: QuestionType.MULTI
    });
    formService.answers.push(formBuilder.control('answer1'));
    presenter.submitQuestion();
    tick();
    expect(answers.length).toBe(1);
  }));
});
