import {QuestionType} from './question-type';
import {Answer} from './answer';

export class Question {
  statement = '';
  questionType: QuestionType = QuestionType.SINGLE;
  answers: Answer[] = [];
}
