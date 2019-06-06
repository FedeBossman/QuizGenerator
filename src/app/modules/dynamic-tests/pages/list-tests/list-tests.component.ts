import {Component, OnInit} from '@angular/core';
import {DynamicTestService} from '../../../../core/services/dynamic-test.service';
import {DynamicTest} from '../../../../shared/models/dynamic-test';

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.component.html',
  styleUrls: ['./list-tests.component.scss']
})
export class ListTestsComponent implements OnInit {

  tests: DynamicTest[];

  constructor(private testService: DynamicTestService) {
  }

  ngOnInit() {
    this.testService.getTests()
      .subscribe(tests => this.tests = tests);
  }

  onDeleteTest(test: DynamicTest) {
    this.testService.deleteTest(test.id)
      .subscribe(res => {
        this.tests = this.tests.filter(t => t.id !== test.id);
      });
  }
}
