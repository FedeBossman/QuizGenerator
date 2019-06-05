import {Answer} from '../../../../shared/models/answer';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {v4 as uuid} from 'uuid';
import {Question} from '../../../../shared/models/question';
import {QuestionType} from '../../../../shared/models/question-type';

export class NewQuestionPresenter {
  private questionSubject: BehaviorSubject<Question> = new BehaviorSubject(new Question());
  question$: Observable<Question> = this.questionSubject.asObservable();

  private submitQuestionSubject: Subject<Question> = new Subject();
  submitQuestion$: Observable<Question> = this.submitQuestionSubject.asObservable();

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

  private set questionType(questionType: QuestionType) {
    this.question = {
      ...this.question,
      questionType
    };
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

  changeStatement(statement: any) {
    this.statement = statement;
  }

  changeQuestionType(questionType: QuestionType) {
    this.questionType = questionType;
  }

  clearQuestion() {
    this.question = new Question();
  }

  submitQuestion() {
    this.submitQuestionSubject.next(this.question);
    this.clearQuestion();
  }
}
