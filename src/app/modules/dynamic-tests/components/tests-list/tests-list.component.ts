import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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

  displayedColumns = ['name', 'questions', 'actions'];

  constructor() { }

  ngOnInit() {
  }

}
