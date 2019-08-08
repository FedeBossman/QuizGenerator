import {Component, OnInit, ViewChild} from '@angular/core';
import {NgControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('maskedSsnInput', {static: true})
  maskedSsnInput: NgControl;

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

  maskConfig2 = {
    mask: this.mask.ssn,
    guide: false,
  };

  constructor() {
  }

  ngOnInit() {
    this.maskedSsnInput.control.valueChanges.subscribe((val) => {
      const newVal = [];
      for (const v of val) {
        const regex = /\d/g;
        if (regex.test(v)) {
          newVal.push('*');
        } else {
          newVal.push(v);
        }
      }
      this.maskedSsnInput.valueAccessor.writeValue(newVal.join(''));
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
