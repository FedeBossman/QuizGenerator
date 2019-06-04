import {Component, OnInit} from '@angular/core';
import {QuestionType} from '../../../../shared/models/question-type';
import {Answer} from '../../../../shared/models/answer';
import {NewQuestionPresenter} from './new-question.presenter';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  providers: [NewQuestionPresenter]
})
export class NewQuestionComponent implements OnInit {

  defaultQuestionType = QuestionType.SINGLE;
  questionTypes = [
    {value: QuestionType.SINGLE, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
  ];

  statement: string;

  constructor(public presenter: NewQuestionPresenter) {
  }

  ngOnInit() {

  }

  onStatementChange($event: any) {
    this.statement = $event;
  }

  trackAnswers(index, answer) {
    return answer ? answer.value : undefined;
  }

  onAddAnswer() {
    this.presenter.newAnswer();
  }

  onAnswerChanged($event: any, answer: Answer) {
    this.presenter.changeAnswer($event, answer);
  }

  onRemoveAnswer(answer: Answer) {
    this.presenter.removeAnswer(answer);
  }
}
