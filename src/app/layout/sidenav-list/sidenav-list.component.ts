import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output()
  navItemClicked: EventEmitter<void> = new EventEmitter<void>();

  links: { name: string, ref: string, icon: string }[] = [
    {name: 'Home', ref: '', icon: 'home'},
    {name: 'Create a test', ref: 'test/create', icon: 'assignment'},
    {name: 'List tests', ref: 'test/list', icon: 'list'},
    {name: 'Login', ref: 'auth/login', icon: 'input'},
    {name: 'Signup', ref: 'auth/signup', icon: 'person_add'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onNavItemClicked() {
    this.navItemClicked.emit();
  }

}
