import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTestComponent} from './create-test.component';
import {SharedModule} from '../../../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NewQuestionComponent} from '../../components/new-question/new-question.component';
import {TestSummaryComponent} from '../../components/test-summary/test-summary.component';
import {DynamicTestService} from '../../../../core/services/dynamic-test.service';
import {RouterTestingModule} from '@angular/router/testing';
import {DynamicTest} from '../../../../shared/models/dynamic-test';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Question} from '../../../../shared/models/question';

class DynamicTestServiceMock {
  addTest(test: DynamicTest) {
    return of({...test, id: '123abc'});
  }
}

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: (): Observable<any> => of({name: 'DialogTestName'})
    };
  }
}

describe('CreateTestComponent', () => {
  let component: CreateTestComponent;
  let fixture: ComponentFixture<CreateTestComponent>;
  let testService: DynamicTestService;
  let dialogService: MatDialogMock;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule, RouterTestingModule],
      declarations: [CreateTestComponent, NewQuestionComponent, TestSummaryComponent],
      providers: [
        {provide: DynamicTestService, useClass: DynamicTestServiceMock},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestComponent);
    component = fixture.componentInstance;
    testService = TestBed.get(DynamicTestService);
    dialogService = TestBed.get(MatDialog);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add question to test onSubmitQuestion', () => {
    const question = new Question();
    question.statement = 'Test question';
    component.onSubmitQuestion(question);
    expect(component.test.questions.length).toBe(1);
    expect(component.test.questions[0].statement).toBe('Test question');
  });

  it('should create test and navigate to test list', () => {
    const spy = spyOn(testService, 'addTest').and.callThrough();
    const routerSpy = spyOn(router, 'navigate').and.callThrough();
    component.saveTest('TestTest');
    expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/test/list']);
  });

  xit('should not create test and not navigate to test list', () => {
    // const spy = spyOn(testService, 'addTest').and.callFake(throwError(new Error('Testing error stub')));
    const routerSpy = spyOn(router, 'navigate').and.callThrough();
    component.saveTest('TestTest');
    // expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/test/list']);
  });


  it('should call saveTest onSaveTest if dialog afterClosed has data', () => {
    const saveTestSpy = spyOn(component, 'saveTest').and.callThrough();
    component.onSaveTest();
    expect(saveTestSpy).toHaveBeenCalledWith('DialogTestName');
  });

  it('should call saveTest onSaveTest if dialog is false', () => {
    spyOn(dialogService, 'open').and.callFake(() => {
      return {
        afterClosed: () => of(false)
      };
    });
    const saveTestSpy = spyOn(component, 'saveTest').and.callThrough();
    component.onSaveTest();
    expect(saveTestSpy).not.toHaveBeenCalled();
  });
});
