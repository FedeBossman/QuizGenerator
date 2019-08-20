import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListTestsComponent} from './list-tests.component';
import {SharedModule} from '../../../../shared/shared.module';
import {TestsListComponent} from '../../components/tests-list/tests-list.component';
import {DynamicTestService} from '../../../../core/services/dynamic-test.service';
import {DynamicTest} from '../../../../shared/models/dynamic-test';
import {Question} from '../../../../shared/models/question';
import {Observable, of} from 'rxjs';

class DynamicTestServiceMock {
  getTests() {
    const newTest = new DynamicTest();
    newTest.id = 100;
    newTest.questions = [{...new Question(), statement: 'What\'s my age again?'}];
    return of([newTest]);
  }
  deleteTest(id: number): Observable<{}> {
    const newTest = new DynamicTest();
    newTest.questions = [{...new Question(), statement: 'What\'s my age again?'}];
    return of({});
  }
}

describe('ListTestsComponent', () => {
  let component: ListTestsComponent;
  let fixture: ComponentFixture<ListTestsComponent>;
  let dynamicTestService: DynamicTestServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ListTestsComponent, TestsListComponent],
      providers: [
        {provide: DynamicTestService, useClass: DynamicTestServiceMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTestsComponent);
    component = fixture.componentInstance;
    dynamicTestService = TestBed.get(DynamicTestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDeleteTest', () => {
    it('should empty tests array onDeleteTest', () => {
      const spy = spyOn(dynamicTestService, 'deleteTest').and.callThrough();
      const test = component.tests[0];
      component.onDeleteTest(test);
      expect(spy).toHaveBeenCalledWith(test.id);
      expect(component.tests.length).toBe(0);
    });
  });
});
