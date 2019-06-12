import {TestBed} from '@angular/core/testing';

import {NewQuestionFormValidatorsService} from './new-question-form-validators.service';

describe('NewQuestionFormValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [NewQuestionFormValidatorsService]
  }));

  it('should be created', () => {
    const service: NewQuestionFormValidatorsService = TestBed.get(NewQuestionFormValidatorsService);
    expect(service).toBeTruthy();
  });
});
