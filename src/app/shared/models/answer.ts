import {v4 as uuid} from 'uuid';

export class Answer {
  viewValue: string;
  value: string;

  static fromRawForm(formValue: any): Answer {
    return {viewValue: formValue, value: uuid()} as Answer;
  }
}
