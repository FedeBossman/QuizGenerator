import { Injectable } from '@angular/core';
import {FormArray, ValidatorFn} from '@angular/forms';

@Injectable()
export class NewQuestionFormValidatorsService {

  constructor() { }

  noAnswersValidator(): ValidatorFn {
    return (control: FormArray): {[key: string]: any} | null => {
      const hasAnswers = control.controls.length > 0;
      return !hasAnswers ? {noAnswers: {value: control.controls.length}} : null;
    };
  }
}
