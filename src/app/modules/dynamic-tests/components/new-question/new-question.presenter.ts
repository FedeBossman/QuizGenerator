import {Observable, Subject} from 'rxjs';
import {Question} from '../../../../shared/models/question';
import {Injectable} from '@angular/core';
import {NewQuestionFormService} from './services/new-question-form.service';

@Injectable()
export class NewQuestionPresenter {

  private submitQuestionSubject: Subject<Question> = new Subject();
  submitQuestion$: Observable<Question> = this.submitQuestionSubject.asObservable();

  constructor(private formService: NewQuestionFormService) {
  }

  submitQuestion() {
    if (!this.formService.isValid) {
      return;
    }
    const question = Question.fromRawForm(this.formService.questionForm.getRawValue());
    this.submitQuestionSubject.next(question);
    this.formService.resetForm();
  }
}
