import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicTest} from '../../../../shared/models/dynamic-test';

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

  constructor() { }

  ngOnInit() {
  }

  onDeleteTest(test: DynamicTest) {
    this.deleteTest.emit(test);
  }
}
