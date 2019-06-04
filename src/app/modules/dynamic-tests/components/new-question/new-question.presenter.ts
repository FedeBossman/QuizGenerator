import {Answer} from '../../../../shared/models/answer';
import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuid} from 'uuid';
import {Question} from '../../../../shared/models/question';

export class NewQuestionPresenter {
  questionSubject: BehaviorSubject<Question> = new BehaviorSubject(new Question());
  $question: Observable<Question> = this.questionSubject.asObservable();

  private get answers(): Answer[] {
    return this.question.answers;
  }

  private set answers(answers: Answer[]) {
    this.question = {
      ...this.question,
      answers
    };
  }

  private get question(): Question {
    return this.questionSubject.getValue();
  }

  private set question(question: Question) {
    this.questionSubject.next(question);
  }

  private set statement(statement: string) {
    this.question = {
      ...this.question,
      statement
    };
  }

  newAnswer() {
    console.log(this.answers);
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

  changeStatement(statement: any) {
    this.statement = statement;
  }
}
