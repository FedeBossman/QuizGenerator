import { NewQuestionPresenter } from './new-question.presenter';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('NewQuestionPresenter', () => {
  it('should create an instance', () => {
    expect(new NewQuestionPresenter()).toBeTruthy();
  });

  it('should create an answer when calling newAnswer', fakeAsync(() => {
    const presenter = new NewQuestionPresenter();
    let answers = null;
    presenter.$question.subscribe(question => {
      answers = question.answers;
    });
    presenter.newAnswer();
    presenter.newAnswer();
    presenter.newAnswer();
    tick();
    expect(answers.length).toBe(3);
  }));

  it('should remove an answer when calling removeAnswer', fakeAsync(() => {
    const presenter = new NewQuestionPresenter();
    let answers = null;
    presenter.$question.subscribe(question => {
      answers = question.answers;
    });
    presenter.newAnswer();
    tick();
    expect(answers.length).toBe(1);
    presenter.removeAnswer(answers[0]);
    tick();
    expect(answers.length).toBe(0);
  }));

  it('should change an answer when calling changeAnswer', fakeAsync(() => {
    const presenter = new NewQuestionPresenter();
    let answers = null;
    presenter.$question.subscribe(question => {
      answers = question.answers;
    });
    presenter.newAnswer();
    tick();
    expect(answers.length).toBe(1);
    presenter.changeAnswer('Answer value', answers[0]);
    tick();
    expect(answers[0].viewValue).toBe('Answer value');
  }));

  it('should change the question\'s statement calling changeStatement', fakeAsync(() => {
    const presenter = new NewQuestionPresenter();
    let statement = '';
    presenter.$question.subscribe(question => {
      statement = question.statement;
    });
    presenter.changeStatement('New statement');
    tick();
    expect(statement).toBe('New statement');
  }));
});
