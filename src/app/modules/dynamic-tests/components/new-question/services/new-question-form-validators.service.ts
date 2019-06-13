import {Injectable} from '@angular/core';
import {FormArray, FormGroup, ValidatorFn} from '@angular/forms';
import {QuestionType} from '../../../../../shared/models/question-type';

@Injectable()
export class NewQuestionFormValidatorsService {

  constructor() {
  }

  noAnswersValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } | null => {
      const questionType = control.get('questionType');
      const answers = control.get('answers') as FormArray;
      const isMulti = (questionType.value === QuestionType.MULTI || questionType.value === QuestionType.SELECT);
      const shouldHaveAnswers = (isMulti && answers.length === 0);
      return shouldHaveAnswers ? {noAnswers: {value: answers.length}} : null;
    };
  }
}
