import {NewQuestionFormValidatorsService} from './new-question-form-validators.service';

describe('NewQuestionFormValidatorsService', () => {
  let service: NewQuestionFormValidatorsService;

  beforeEach(() => {
    service = new NewQuestionFormValidatorsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
