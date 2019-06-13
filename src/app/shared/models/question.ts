import {QuestionType} from './question-type';
import {Answer} from './answer';

export class Question {
  statement = '';
  questionType: QuestionType = QuestionType.SELECT;
  answers: Answer[] = [];

  static fromRawForm(formValue: any): Question {
    return {
      ...formValue,
      answers: formValue.answers.map(a => Answer.fromRawForm(a))
    } as Question;
  }
}
