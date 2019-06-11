import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {QuestionType} from '../../../../shared/models/question-type';
import {NewQuestionPresenter} from './new-question.presenter';
import {Question} from '../../../../shared/models/question';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

/** A hero's name can't match the given regular expression */
function noAnswersValidator(): ValidatorFn {
  return (control: FormArray): {[key: string]: any} | null => {
    const hasAnswers = control.controls.length > 0;
    return !hasAnswers ? {noAnswers: {value: control.controls.length}} : null;
  };
}

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  providers: [NewQuestionPresenter]
})
export class NewQuestionComponent implements OnInit, OnDestroy {

  questionForm: FormGroup;

  questionTypes = [
    {value: QuestionType.SINGLE, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
  ];

  @Output()
  private submitQuestion: EventEmitter<Question> = new EventEmitter();
  private destroy$: Subject<void> = new Subject();

  get statement() {
    return this.questionForm.get('statement') as FormControl;
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  constructor(private fb: FormBuilder, public presenter: NewQuestionPresenter) {
  }

  ngOnInit() {
    this.loadInitialForm();
    this.presenter.submitQuestion$
      .pipe(takeUntil(this.destroy$))
      .subscribe(question => this.submitQuestion.emit(question));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadInitialForm() {
    this.questionForm = this.fb.group({
      statement: ['', [Validators.required]],
      questionType: [''],
      answers: this.fb.array([], noAnswersValidator())
    });
  }

  onAddAnswer() {
    this.answers.push(this.fb.control(''));
  }

  onRemoveAnswer(answerIndex: number) {
    this.answers.removeAt(answerIndex);
  }

  onSubmitQuestion() {
    this.presenter.submitQuestion(this.questionForm.getRawValue());
    this.loadInitialForm();
  }
}
