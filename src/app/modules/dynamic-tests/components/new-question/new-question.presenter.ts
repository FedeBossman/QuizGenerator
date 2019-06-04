import {Answer} from '../../../../shared/models/answer';
import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuid} from 'uuid';

export class NewQuestionPresenter {
  answersSubject: BehaviorSubject<Answer[]> = new BehaviorSubject([
    {viewValue: 'Answer 1', value: uuid()},
    {viewValue: 'Answer 2', value: uuid()},
    {viewValue: 'Answer 3', value: uuid()},
  ]);

  $answers: Observable<Answer[]> = this.answersSubject.asObservable();

  private get answers(): Answer[] {
    return this.answersSubject.getValue();
  }

  private set answers(answers: Answer[]) {
    this.answersSubject.next(answers);
  }

  newAnswer() {
    this.answers = [...this.answers, {viewValue: '', value: uuid()}];
  }

  changeAnswer(newAnswerValue: any, currentAnswer: Answer) {
    this.answers = this.answers.map((answer) => {
      if (answer.value !== currentAnswer.value) {
        return answer;
      }
      return {
        ...answer,
        viewValue: newAnswerValue
      };
    });
  }

  removeAnswer(removedAnswer: Answer) {
    this.answers = this.answers.filter(answer => answer.value !== removedAnswer.value);
  }
}
