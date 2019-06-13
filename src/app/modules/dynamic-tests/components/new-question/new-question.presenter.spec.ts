import {NewQuestionPresenter} from './new-question.presenter';
import {fakeAsync, tick} from '@angular/core/testing';
import {NewQuestionFormService} from './services/new-question-form.service';
import {QuestionType} from '../../../../shared/models/question-type';

class StubNewQuestionFormService {
  get isValid() {
    return true;
  }

  get questionForm() {
    return {
      getRawValue(): any {
        return {
          statement: 'TestQuestion',
          questionType: QuestionType.MULTI,
          answers: ['answer1', 'answer2']
        };
      }
    };
  }

  resetForm() {
  }
}

describe('NewQuestionPresenter', () => {
  let presenter: NewQuestionPresenter;
  let formService: NewQuestionFormService;

  beforeEach(() => {
    formService = new StubNewQuestionFormService() as NewQuestionFormService;
    presenter = new NewQuestionPresenter(formService);
  });

  it('should be created', () => {
    expect(presenter).toBeTruthy();
  });

  it('should reset form if the form is valid', (() => {
    const spy = spyOn(formService, 'resetForm').and.callThrough();
    presenter.submitQuestion();
    expect(spy).toHaveBeenCalled();
  }));

  it('should not reset form if the form is not valid', (() => {
    spyOnProperty(formService, 'isValid').and.returnValue(false);
    const spy = spyOn(formService, 'resetForm').and.callThrough();
    presenter.submitQuestion();
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should emit a Question when calling submitQuestion', fakeAsync(() => {
    let answers = null;
    presenter.submitQuestion$.subscribe(question => {
      answers = question.answers;
    });
    presenter.submitQuestion();
    tick();
    expect(answers.length).toBe(2);
    expect(answers[0].viewValue).toBe('answer1');
  }));
});
