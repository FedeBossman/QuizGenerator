import {Directive, ElementRef, HostListener, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {BACKSPACE} from '@angular/cdk/keycodes';

// TODO: fix selecting multiple characters to replace
// TODO: fix accents
@Directive({
  selector: '[appMaskedInput]'
})
export class MaskedInputDirective {
  private originalValue = '';
  private maskedValue = '';

  constructor(@Self() private ngControl: NgControl, private el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) keyDownEvent($event) {
    // Special control case for backspace
    if (($event.key && $event.key === 'Backspace') ||
      ($event.keyIdentifier && $event.keyIdentifier === BACKSPACE) ||
      ($event.keyCode && $event.keyCode === BACKSPACE)) {
      console.log('keydown', this.ngControl.value);
      this.writeValueAndKeepCursors(this.originalValue);
    }
  }

  @HostListener('keypress') keyPressEvent() {
    console.log('keypress', this.ngControl.value);
    this.writeValueAndKeepCursors(this.originalValue);
  }

  @HostListener('input') inputEvent() {
    // Check if the value changed to process it
    if (this.ngControl.value !== this.originalValue) {
      // Store value before changing it
      this.originalValue = this.ngControl.value;
      console.log('input', this.originalValue);
      this.maskedValue = this.originalValue.replace(/\d/g, '*');
    } else {
      console.log('No changes in input', this.originalValue);
    }
    // Set the masked value without changing the ngform
    this.writeValueAndKeepCursors(this.maskedValue);
  }

  @HostListener('selectionstart') selectStartEvent() {
    console.log('selectstart');
    return false;
  }

  private writeValueAndKeepCursors(value) {
    // Get cursor selection before writing value
    const originalSelStart = this.el.nativeElement.selectionStart;
    const originalSelEnd = this.el.nativeElement.selectionEnd;
    // Write value
    this.ngControl.valueAccessor.writeValue(value);
    // Set cursor back after writing value
    this.el.nativeElement.selectionStart = originalSelStart;
    this.el.nativeElement.selectionEnd = originalSelEnd;
  }
}
