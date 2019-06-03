import {Component, OnInit} from '@angular/core';
import {QuestionType} from '../../../../shared/models/question-type';
import {Answer} from '../../../../shared/models/answer';

@Component({
  selector: 'app-new-field',
  templateUrl: './new-field.component.html',
  styleUrls: ['./new-field.component.scss']
})
export class NewFieldComponent implements OnInit {

  defaultQuestionType = QuestionType.SINGLE;
  questionTypes = [
    {value: QuestionType.SINGLE, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
  ];

  statement: string;
  answers: Answer[] = [
    {viewValue: 'Answer 1', value: 'answer1'},
    {viewValue: 'Answer 2', value: 'answer2'},
    {viewValue: 'Answer 3', value: 'answer3'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onAnswerChanged($event: Event, answer: Answer) {
    console.log('Answer changed', $event, answer);
  }

  onAddAnswer() {
    this.answers = [...this.answers, {viewValue: '', value: ''}];
  }

  onStatementChange($event: any) {
    this.statement = $event;
  }
}
