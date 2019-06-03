import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output()
  private navItemClicked: EventEmitter<void> = new EventEmitter<void>();

  links: { name: string, ref: string, icon: string }[] = [
    {name: 'Home', ref: '', icon: 'home'},
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
