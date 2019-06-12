import { TestBed } from '@angular/core/testing';

import { NewQuestionFormService } from './new-question-form.service';
import {SharedModule} from '../../../../../shared/shared.module';
import {NewQuestionFormValidatorsService} from './new-question-form-validators.service';

describe('NewQuestionFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SharedModule],
    providers: [NewQuestionFormService, NewQuestionFormValidatorsService]
  }));

  it('should be created', () => {
    const service: NewQuestionFormService = TestBed.get(NewQuestionFormService);
    expect(service).toBeTruthy();
  });
});
