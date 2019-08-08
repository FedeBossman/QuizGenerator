import {Directive, ElementRef, HostListener, Input, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {BACKSPACE} from '@angular/cdk/keycodes';

// TODO: fix accent problem. If an accent is written it breaks functionality. Check with other cases
@Directive({
  selector: '[appMaskedInput]'
})
export class MaskedInputDirective {
  private originalValue = '';
  private maskedValue = '';

  @Input()
  appMaskedInput: ((value: string) => string);

  constructor(@Self() private ngControl: NgControl, private el: ElementRef) {}

  /**
   * Check for keydown in cases that do not work with keypress
   * @param $event - Keydown Event
   */
  @HostListener('keydown', ['$event']) keyDownEvent($event) {
    // Special control case for backspace
    if (($event.key && $event.key === 'Backspace') ||
      ($event.keyIdentifier && $event.keyIdentifier === BACKSPACE) ||
      ($event.keyCode && $event.keyCode === BACKSPACE)) {
      console.log('keydown', this.ngControl.value);
      this.writeValueAndKeepCursors(this.originalValue);
    }
  }

  /**
   * Write the original value of the input (without the mask). This way we don't lose the value input by user.
   * This is triggered before the character on the key pressed is input.
   */
  @HostListener('keypress') keyPressEvent() {
    console.log('keypress', this.ngControl.value);
    this.writeValueAndKeepCursors(this.originalValue);
  }

  /**
   * On input, alter the value input by user to mask it.
   * Store the original value to reset on keypress
   */
  @HostListener('input') inputEvent() {
    // Check if the value changed to process it
    if (this.ngControl.value !== this.originalValue) {
      // Store value before changing it
      this.originalValue = this.ngControl.value;
      console.log('input', this.originalValue);
      // Create new masked value
      this.maskedValue = this.maskValue(this.originalValue);
    } else {
      console.log('No changes in input', this.originalValue);
    }
    // Set the masked value without changing the NgForm
    this.writeValueAndKeepCursors(this.maskedValue);
  }

  /**
   * Executes the function passed on directive to mask/alter the value
   * @param value - Value to mask
   */
  private maskValue(value) {
    // TODO: Let user input a regex (regex or function)
    return this.appMaskedInput(value);
  }

  /**
   * Writes the value on the NgControl without changing the value on the form
   * Gets initial cursor positions to reset after write (if not, cursor goes to end of line)
   * @param value - Value to insert
   */
  private writeValueAndKeepCursors(value: string): void {
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
