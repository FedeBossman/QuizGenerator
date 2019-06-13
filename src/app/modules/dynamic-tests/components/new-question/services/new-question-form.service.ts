import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NewQuestionFormValidatorsService} from './new-question-form-validators.service';
import {QuestionType} from '../../../../../shared/models/question-type';

@Injectable()
export class NewQuestionFormService {

  questionTypes = [
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
    {value: QuestionType.SELECT, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
  ];

  questionForm: FormGroup;

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  get questionType(): FormControl {
    return this.questionForm.get('questionType') as FormControl;
  }

  get isValid(): boolean {
    return this.questionForm.valid;
  }

  get isMultiAnswer(): boolean {
    const questionType =  this.questionForm.get('questionType').value;
    return (questionType === QuestionType.SELECT || questionType === QuestionType.MULTI);
  }

  constructor(private fb: FormBuilder, private validatorService: NewQuestionFormValidatorsService) {
    this.loadInitialForm();
    // Modify answers after questionType changes
    this.questionForm.controls.questionType.valueChanges
      .subscribe(() => {
        if (!this.isMultiAnswer) {
          this.clearAnswers();
        } else if (this.answers.length < 1) {
          this.addAnswer();
        }
      });
  }

  loadInitialForm() {
    this.questionForm = this.fb.group({
      statement: ['', [Validators.required]],
      questionType: ['', [Validators.required]],
      answers: this.fb.array([])
    }, {
      validators: this.validatorService.noAnswersValidator()
    });
  }

  clearAnswers() {
    while (this.answers.length) {
      this.answers.removeAt(0);
    }
  }

  addAnswer() {
    if (!this.isMultiAnswer) {
      return;
    }
    this.answers.push(this.fb.control(''));
  }

  removeAnswer(answerIndex: number) {
    this.answers.removeAt(answerIndex);
  }

  resetForm() {
    this.clearAnswers();
    this.questionForm.reset();
  }
}
