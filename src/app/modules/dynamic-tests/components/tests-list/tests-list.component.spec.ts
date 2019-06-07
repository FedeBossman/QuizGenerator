import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestsListComponent} from './tests-list.component';
import {SharedModule} from '../../../../shared/shared.module';
import {DynamicTest} from '../../../../shared/models/dynamic-test';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material';
import {of} from 'rxjs';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

describe('TestsListComponent', () => {
  let component: TestsListComponent;
  let dialogService: MatDialogMock;
  let fixture: ComponentFixture<TestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [TestsListComponent],
      providers: [
        {
          provide: MatDialog, useClass: MatDialogMock,
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsListComponent);
    dialogService = TestBed.get(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteTest on afterClosed is true', () => {
    const test = new DynamicTest();
    test.name = 'TestTest';

    const deleteTestEmitSpy = spyOn(component.deleteTest, 'emit').and.callThrough();
    component.onDeleteTest(test);
    expect(component.dialogRef).toBeDefined();
    expect(deleteTestEmitSpy).toHaveBeenCalledWith(test);
  });

  it('should not emit deleteTest on afterClosed is false', () => {
    const test = new DynamicTest();
    test.name = 'TestTest';

    spyOn(dialogService, 'open').and.callFake(() => {
      return {
        afterClosed: () => of(false)
      };
    });
    const deleteTestEmitSpy = spyOn(component.deleteTest, 'emit').and.callThrough();
    component.onDeleteTest(test);
    expect(component.dialogRef).toBeDefined();
    expect(deleteTestEmitSpy).not.toHaveBeenCalled();
  });
});
