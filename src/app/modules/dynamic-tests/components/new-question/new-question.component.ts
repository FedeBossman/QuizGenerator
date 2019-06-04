import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {QuestionType} from '../../../../shared/models/question-type';
import {Answer} from '../../../../shared/models/answer';
import {NewQuestionPresenter} from './new-question.presenter';
import {Question} from '../../../../shared/models/question';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  providers: [NewQuestionPresenter]
})
export class NewQuestionComponent implements OnInit, OnDestroy {

  questionTypes = [
    {value: QuestionType.SINGLE, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
  ];
  @Output()
  private submitQuestion: EventEmitter<Question> = new EventEmitter();
  private destroy$: Subject<void> = new Subject();

  constructor(public presenter: NewQuestionPresenter) {
  }

  ngOnInit() {
    this.presenter.submitQuestion$
      .pipe(takeUntil(this.destroy$))
      .subscribe(question => this.submitQuestion.emit(question));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStatementChange($event: any) {
    this.presenter.changeStatement($event);
  }

  onQuestionTypeChange($event: QuestionType) {
    this.presenter.changeQuestionType($event);
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

  onSubmitQuestion() {
    this.presenter.submitQuestion();
  }
}
