import {Component, Input, OnInit} from '@angular/core';
import {DynamicTest} from '../../../../shared/models/dynamic-test';

@Component({
  selector: 'app-test-summary',
  templateUrl: './test-summary.component.html',
  styleUrls: ['./test-summary.component.scss']
})
export class TestSummaryComponent implements OnInit {

  @Input()
  test: DynamicTest;

  displayedColumns: string[] = ['position', 'statement', 'type'];

  constructor() { }

  ngOnInit() {
  }

}
