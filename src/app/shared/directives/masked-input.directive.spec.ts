import {MaskedInputDirective} from './masked-input.directive';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {SharedModule} from '../shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


// Simple test component that will not in the actual app
@Component({
  template: '<input [appMaskedInput]="maskField" ngModel #testInput="ngModel" name="test"\n/>'
})
class TestComponent {
  @ViewChild('testInput', {static: true}) testInput: NgControl;

  maskField(value: string): string {
    return value.toUpperCase();
  }
}

fdescribe('MaskedInputDirective', () => {
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
});
