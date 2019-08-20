import {MaskedInputDirective} from './masked-input.directive';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SharedModule} from '../shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


// Simple test component that will not in the actual app
@Component({
  template: '<input [appMaskedInput]="maskField" ngModel #testInput="ngModel" name="test"\n/>'
})
class TestComponent {
  maskField(value: string): string {
    return value.toUpperCase();
  }
}

function createKeydownEvent(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', {
    key,
    cancelable: false
  });
}

function createKeypressEvent(key: string): KeyboardEvent {
  return new KeyboardEvent('keypress', {
    key,
    cancelable: false
  });
}

describe('MaskedInputDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [SharedModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });


  it('should return the original "aa" value once a key is pressed', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.children[0];

    // Input a value so that it gets transformed
    inputElement.value = 'aa';
    inputElement.dispatchEvent(new Event('input'));

    // Press key to get the original value back (lowercase)
    inputElement.dispatchEvent(createKeypressEvent('bb'));

    fixture.detectChanges();
    expect(inputElement.value).toBe('aa');
  });


  it('should return to the original "aa" value once Backspace is down', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.children[0];

    // Input a value so that it gets transformed
    inputElement.value = 'aa';
    inputElement.dispatchEvent(new Event('input'));

    // Press down on backspace to get the original value back (lowercase)
    inputElement.dispatchEvent(createKeydownEvent('Backspace'));

    fixture.detectChanges();
    expect(inputElement.value).toBe('aa');
  });


  it('should not write the original value when a keydown event different from Backspace is triggered', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.children[0];

    // Input a value so that it gets transformed
    inputElement.value = 'aa';
    inputElement.dispatchEvent(new Event('input'));

    // Press down on a key that is not backspace to get the masked value back (uppercase)
    inputElement.dispatchEvent(createKeydownEvent('NOTBackspace'));

    fixture.detectChanges();
    expect(inputElement.value).toBe('AA');
  });

  it('should transform the inputs given to the element according to inputEvent', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.children[0];

    // Input a value to see if it gets transformed
    inputElement.value = 'aa';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(inputElement.value).toBe('AA');

    // Input a different value
    inputElement.value = 'bb';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(inputElement.value).toBe('BB');

    // Input the same to check it does not change
    inputElement.value = 'bb';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(inputElement.value).toBe('BB');
  });
});
