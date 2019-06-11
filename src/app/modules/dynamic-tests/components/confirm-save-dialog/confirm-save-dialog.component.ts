import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, MinLengthValidator, Validators} from '@angular/forms';

@Component({
  selector: 'app-confirm-save-dialog',
  templateUrl: './confirm-save-dialog.component.html',
  styleUrls: ['./confirm-save-dialog.component.scss']
})
export class ConfirmSaveDialogComponent {
  name = new FormControl('', Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {
  }

  onSave() {
    return {name: this.name.value};
  }

  onCancel() {
    return false;
  }
}
