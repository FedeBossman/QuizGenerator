import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewQuestionFormService } from './new-question-form.service';
import {SharedModule} from '../../../../../shared/shared.module';
import {NewQuestionFormValidatorsService} from './new-question-form-validators.service';
import {QuestionType} from '../../../../../shared/models/question-type';

describe('NewQuestionFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SharedModule],
    providers: [NewQuestionFormService, NewQuestionFormValidatorsService]
  }));

  it('should be created', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    expect(service).toBeTruthy();
  });

  it('should return true for isMultiAnswer when question type is MULTI or SELECT', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);

    service.questionType.setValue(QuestionType.MULTI);
    expect(service.isMultiAnswer).toBe(true);
    service.questionType.setValue(QuestionType.SELECT);
    expect(service.isMultiAnswer).toBe(true);
  });

  it('should return true for isMultiAnswer when question type is TEXT or NUMBER', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);

    service.questionType.setValue(QuestionType.TEXT);
    expect(service.isMultiAnswer).toBe(false);
    service.questionType.setValue(QuestionType.NUMBER);
    expect(service.isMultiAnswer).toBe(false);
  });

  it('should clear answers when changing to number type', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    const spy = spyOn(service, 'clearAnswers').and.callThrough();
    expect(service.answers.length).toBe(0);

    service.questionType.setValue(QuestionType.NUMBER);
    expect(spy).toHaveBeenCalled();
  });

  it('should not clear answers when changing to multi type and add a first answer', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    const spy = spyOn(service, 'clearAnswers').and.callThrough();
    expect(service.answers.length).toBe(0);

    service.questionType.setValue(QuestionType.MULTI);
    expect(spy).not.toHaveBeenCalled();
    expect(service.answers.length).toBe(1);
  });

  it('should not add an answer when changing from multi to select with answers', (() => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    const spy = spyOn(service, 'addAnswer').and.callThrough();
    expect(service.answers.length).toBe(0);

    service.questionType.setValue(QuestionType.MULTI);
    expect(service.isMultiAnswer).toBe(true);
    expect(service.answers.length).toBe(1);

    service.questionType.setValue(QuestionType.SELECT);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(service.isMultiAnswer).toBe(true);
    expect(service.answers.controls.length).toBe(1);
  }));

  it('should clear answers when calling clearAnswers', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    spyOnProperty(service, 'isMultiAnswer').and.returnValue(true);
    service.addAnswer();
    service.addAnswer();
    expect(service.answers.controls.length).toBe(2);

    service.clearAnswers();
    expect(service.answers.controls.length).toBe(0);
  });

  it('should clear answers when calling clearAnswers', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    const spy = spyOn(service.questionForm, 'reset').and.callThrough();
    service.resetForm();
    expect(spy).toHaveBeenCalled();
  });

  it('should add an answer if isMultiAnswer is true', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    spyOnProperty(service, 'isMultiAnswer').and.returnValue(true);
    service.addAnswer();
    expect(service.answers.controls.length).toBe(1);
  });

  it('should not add answers if isMultiAnswer is false', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    spyOnProperty(service, 'isMultiAnswer').and.returnValue(false);
    service.addAnswer();
    expect(service.answers.controls.length).toBe(0);
  });
});
