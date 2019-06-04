import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSummaryComponent } from './test-summary.component';
import {SharedModule} from '../../../../shared/shared.module';
import {DynamicTest} from '../../../../shared/models/dynamic-test';

describe('TestSummaryComponent', () => {
  let component: TestSummaryComponent;
  let fixture: ComponentFixture<TestSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ TestSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSummaryComponent);
    component = fixture.componentInstance;
    component.test = new DynamicTest();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
