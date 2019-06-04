import {Component, OnInit} from '@angular/core';
import {Question} from '../../../../shared/models/question';
import {DynamicTest} from '../../../../shared/models/dynamic-test';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  test: DynamicTest = new DynamicTest();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmitQuestion(question: Question) {
    this.test = {
      ...this.test,
      questions: [...this.test.questions, question]
    };
  }
}
