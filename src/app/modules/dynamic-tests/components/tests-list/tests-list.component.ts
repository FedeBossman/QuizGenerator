import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicTest} from '../../../../shared/models/dynamic-test';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDeleteDialogComponent} from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsListComponent implements OnInit {

  @Input()
  tests: DynamicTest[];

  @Output()
  deleteTest: EventEmitter<DynamicTest> = new EventEmitter();

  displayedColumns = ['name', 'questions', 'actions'];
  dialogRef: MatDialogRef<ConfirmDeleteDialogComponent, any>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onDeleteTest(test: DynamicTest) {
    this.dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: test.name,
    });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.deleteTest.emit(test);
        }
        this.dialogRef = null;
      });
  }
}
