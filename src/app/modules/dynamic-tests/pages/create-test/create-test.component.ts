import {Component, OnInit} from '@angular/core';
import {Question} from '../../../../shared/models/question';
import {DynamicTest} from '../../../../shared/models/dynamic-test';
import {DynamicTestService} from '../../../../core/services/dynamic-test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  test: DynamicTest = new DynamicTest();

  constructor(private testService: DynamicTestService) {
  }

  ngOnInit() {
  }

  onSubmitQuestion(question: Question) {
    this.test = {
      ...this.test,
      questions: [...this.test.questions, question]
    };
  }

  onSaveTest() {
    this.test.name = 'Test';
    this.testService.addTest(this.test)
      .subscribe(test => console.log('test saved successfully', test));
  }
}
