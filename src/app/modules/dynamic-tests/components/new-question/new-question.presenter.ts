import {Answer} from '../../../../shared/models/answer';
import {Observable, Subject} from 'rxjs';
import {v4 as uuid} from 'uuid';
import {Question} from '../../../../shared/models/question';
import {QuestionType} from '../../../../shared/models/question-type';

export class NewQuestionPresenter {
  private submitQuestionSubject: Subject<Question> = new Subject();
  submitQuestion$: Observable<Question> = this.submitQuestionSubject.asObservable();

  submitQuestion(formValue: any) {
    const question = {
      ...formValue,
      answers: formValue.answers.map(a => ({viewValue: a, value: uuid()} as Answer))
    } as Question;

    this.submitQuestionSubject.next(question);
  }
}
