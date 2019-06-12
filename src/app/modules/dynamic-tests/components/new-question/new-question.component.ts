import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {QuestionType} from '../../../../shared/models/question-type';
import {NewQuestionPresenter} from './new-question.presenter';
import {Question} from '../../../../shared/models/question';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormArray, FormGroup} from '@angular/forms';
import {NewQuestionFormService} from './services/new-question-form.service';
import {NewQuestionFormValidatorsService} from './services/new-question-form-validators.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  providers: [
    NewQuestionPresenter,
    NewQuestionFormService,
    NewQuestionFormValidatorsService
  ]
})
export class NewQuestionComponent implements OnInit, OnDestroy {

  @Output()
  private submitQuestion: EventEmitter<Question> = new EventEmitter();
  private destroy$: Subject<void> = new Subject();

  get questionForm(): FormGroup {
    return this.formService.questionForm;
  }

  get answers(): FormArray {
    return this.formService.answers;
  }

  get questionTypes(): {value: QuestionType, viewValue: string}[] {
    return this.formService.questionTypes;
  }

  constructor(private presenter: NewQuestionPresenter, private formService: NewQuestionFormService) {
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

  onAddAnswer() {
    this.formService.addAnswer();
  }

  onRemoveAnswer(answerIndex: number) {
    this.formService.removeAnswer(answerIndex);
  }

  onSubmitQuestion() {
    this.presenter.submitQuestion();
  }
}
