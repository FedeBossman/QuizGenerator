import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewQuestionFormValidatorsService} from './new-question-form-validators.service';
import {QuestionType} from '../../../../../shared/models/question-type';

@Injectable()
export class NewQuestionFormService {

  questionTypes = [
    {value: QuestionType.SINGLE, viewValue: 'Single response'},
    {value: QuestionType.MULTI, viewValue: 'Multiple responses'},
    {value: QuestionType.TEXT, viewValue: 'Text response'},
    {value: QuestionType.NUMBER, viewValue: 'Number response'},
  ];

  questionForm: FormGroup;

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  get isValid(): boolean {
    return this.questionForm.valid;
  }

  constructor(private fb: FormBuilder, private validatorService: NewQuestionFormValidatorsService) {
    console.log('NewQuestionFormService created yeah');
    this.loadInitialForm();
  }

  loadInitialForm() {
    this.questionForm = this.fb.group({
      statement: ['', [Validators.required]],
      questionType: [''],
      answers: this.fb.array([], this.validatorService.noAnswersValidator())
    });
  }

  addAnswer() {
    this.answers.push(this.fb.control(''));
  }

  removeAnswer(answerIndex: number) {
    this.answers.removeAt(answerIndex);
  }

  resetForm() {
    while (this.answers.length) {
      this.answers.removeAt(0);
    }
    this.questionForm.reset();
  }
}
