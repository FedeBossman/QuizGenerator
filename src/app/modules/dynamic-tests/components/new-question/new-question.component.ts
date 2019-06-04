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

  questionTypes = [
    {value: QuestionType.SINGLE, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
  ];

  constructor(public presenter: NewQuestionPresenter) {
  }

  ngOnInit() {

  }

  onStatementChange($event: any) {
    this.presenter.changeStatement($event);
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
