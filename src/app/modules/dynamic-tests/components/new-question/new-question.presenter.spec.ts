import { NewQuestionPresenter } from './new-question.presenter';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('NewQuestionPresenter', () => {
  it('should create an instance', () => {
    expect(new NewQuestionPresenter()).toBeTruthy();
  });

  it('should emit a Question when calling submitQuestion', fakeAsync(() => {
    const presenter = new NewQuestionPresenter();
    let answers = null;
    presenter.submitQuestion$.subscribe(question => {
      answers = question.answers;
    });
    presenter.submitQuestion({
      statement: 'TestQuestion',
      answers: ['answer1', 'answer2']
    });
    tick();
    expect(answers.length).toBe(2);
    expect(answers[0].viewValue).toBe('answer1');

    presenter.submitQuestion({
      statement: 'TestQuestion2',
      answers: ['answer1']
    });
    tick();
    expect(answers.length).toBe(1);
  }));
});
