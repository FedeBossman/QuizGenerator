import {Component} from '@angular/core';
import {Question} from '../../../../shared/models/question';
import {DynamicTest} from '../../../../shared/models/dynamic-test';
import {DynamicTestService} from '../../../../core/services/dynamic-test.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ConfirmSaveDialogComponent} from '../../components/confirm-save-dialog/confirm-save-dialog.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent {

  test: DynamicTest = new DynamicTest();

  constructor(private testService: DynamicTestService, private dialog: MatDialog, private router: Router) {
  }

  onSubmitQuestion(question: Question) {
    this.test = {
      ...this.test,
      questions: [...this.test.questions, question]
    };
  }

  onSaveTest() {
    const dialogRef = this.dialog.open(ConfirmSaveDialogComponent);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.saveTest(result.name);
        }
      });
  }

  saveTest(testName: string) {
    // TODO: sent to specific test view (does not exist yet)
    this.test.name = testName;
    this.testService.addTest(this.test)
      .subscribe(
        test => this.router.navigate(['/test/list']),
      );
  }
}
