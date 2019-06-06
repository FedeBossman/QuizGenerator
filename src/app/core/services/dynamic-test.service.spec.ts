import {inject, TestBed} from '@angular/core/testing';

import {DynamicTestService} from './dynamic-test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DynamicTest} from '../../shared/models/dynamic-test';
import {Question} from '../../shared/models/question';

describe('DynamicTestService', () => {
  const baseUrl = 'http://localhost:3000/api/test';
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: DynamicTestService = TestBed.get(DynamicTestService);
    expect(service).toBeTruthy();
  });

  it('expects service to fetch all data',
    inject([HttpTestingController, DynamicTestService],
      (httpMock: HttpTestingController, service: DynamicTestService) => {
        // We call the service
        service.getTests().subscribe(tests => {
          expect(tests.length).toBe(2);
        });
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne(baseUrl);
        expect(req.request.method).toEqual('GET');
        // Then we set the fake data to be returned by the mock
        req.flush([new DynamicTest(), new DynamicTest()]);
      })
  );

  it('expects service to post a test',
    inject([HttpTestingController, DynamicTestService],
      (httpMock: HttpTestingController, service: DynamicTestService) => {
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
      })
  );

  it('expects service to delete a test',
    inject([HttpTestingController, DynamicTestService],
      (httpMock: HttpTestingController, service: DynamicTestService) => {
        const newTest = new DynamicTest();
        newTest.questions = [{...new Question(), statement: 'What\'s my age again?'}];

        const testId = 1;
        const response = {};
        // We call the service
        service.deleteTest(testId).subscribe(test => {
          expect(test).toBe(response);
        });
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne(`${baseUrl}/${testId}` );
        expect(req.request.method).toEqual('DELETE');
        // Then we set the fake data to be returned by the mock
        req.flush(response);
      })
  );


  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
});
