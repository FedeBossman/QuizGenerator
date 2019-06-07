import {inject, TestBed} from '@angular/core/testing';

import {DynamicTestService} from './dynamic-test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DynamicTest} from '../../shared/models/dynamic-test';
import {Question} from '../../shared/models/question';

describe('DynamicTestService', () => {
  const baseUrl = 'http://localhost:3000/api/test';
  let service: DynamicTestService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  beforeEach(() => {
    service = TestBed.get(DynamicTestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects service to fetch all data', () => {
    // We call the service
    service.getTests().subscribe(tests => {
      expect(tests.length).toBe(2);
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    req.flush([new DynamicTest(), new DynamicTest()]);
  });

  it('expects service to post a test', () => {
      const newTest = new DynamicTest();
      newTest.questions = [{...new Question(), statement: 'What\'s my age again?'}];

      // We call the service
      service.addTest(newTest).subscribe(test => {
        expect(test.questions.length).toBe(1);
        expect(test.questions[0].statement).toBe('What\'s my age again?');
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toEqual('POST');
      // Then we set the fake data to be returned by the mock
      req.flush(newTest);
    }
  );

  it('expects service to delete a test', () => {
      const newTest = new DynamicTest();
      newTest.questions = [{...new Question(), statement: 'What\'s my age again?'}];

      const testId = 1;
      const response = {};
      // We call the service
      service.deleteTest(testId).subscribe(test => {
        expect(test).toBe(response);
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne(`${baseUrl}/${testId}`);
      expect(req.request.method).toEqual('DELETE');
      // Then we set the fake data to be returned by the mock
      req.flush(response);
    }
  );

  it('expects service to fail and handle error from error code', (done: DoneFn) => {
      let response: any;
      const mockErrorResponse = {status: 400, statusText: 'Bad Request'};
      const data = 'Error Code (getTests): 400\n' +
        'Message: Http failure response for http://localhost:3000/api/test: 400 Bad Request';
      service.getTests()
        .subscribe(res => response = res, err => {
          expect(err).toBe(data);
          done();
        });
      // expect(subscription).toThrowError();
      httpMock.expectOne(baseUrl).flush(data, mockErrorResponse);
    }
  );

  it('expects service to fail and handle error from error event', (done: DoneFn) => {
      let response: any;
      const mockErrorEvent = new ErrorEvent('testerrorevent', {
        error : new Error('testerror'),
        message : 'Test error message',
      });
      const data = 'Error (getTests): Test error message';
      service.getTests()
        .subscribe(res => response = res, err => {
          expect(err).toContain(data);
          done();
        });
      httpMock.expectOne(baseUrl).error(mockErrorEvent);
    }
  );

  afterEach(inject([HttpTestingController], () => {
    httpMock.verify();
  }));
});
