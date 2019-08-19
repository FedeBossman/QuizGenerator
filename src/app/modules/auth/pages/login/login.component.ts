import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mask = {
    ssn: [
      /[\w|*]/,
      /[\w|*]/,
      /[\w|*]/,
      '-',
      /[\w|*]/,
      /[\w|*]/,
      '-',
      /[\w|*]/,
      /[\w|*]/,
      /[\w|*]/,
      /[\w|*]/,
    ]
  };

  maskConfig = {
    mask: this.mask.ssn,
    guide: false,
  };

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.router.navigate([this.router.url]);
  }

  maskField(value: string): string {
    const chars = value.split('');
    const limit = Math.min(6, chars.length);
    // Replace initial characters with asterisks
    return chars.map((val, index) => (index !== 3 && index < limit) ? '*' : val).join('');
  }
}
