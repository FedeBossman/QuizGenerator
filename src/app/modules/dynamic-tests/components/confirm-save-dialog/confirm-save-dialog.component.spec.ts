import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmSaveDialogComponent} from './confirm-save-dialog.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ConfirmSaveDialogComponent', () => {
  let component: ConfirmSaveDialogComponent;
  let fixture: ComponentFixture<ConfirmSaveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [ConfirmSaveDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
