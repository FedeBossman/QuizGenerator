import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LayoutModule} from './layout/layout.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenav} from '@angular/material';

describe('AppComponent', () => {
  let appComponentFixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    appComponentFixture = TestBed.createComponent(AppComponent);
    app = appComponentFixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fitness-tracker'`, () => {
    expect(app.title).toEqual('fitness-tracker');
  });

  it('should toggle sidenav onToggleSidenav', () => {
    const sidenav = app.sidenav;
    const spy = spyOn(sidenav, 'toggle').and.callThrough();
    app.onToggleSidenav();
    expect(spy).toHaveBeenCalled();
  });

  it('should close sidenav onNavItemClicked', () => {
    const sidenav = app.sidenav;
    const spy = spyOn(sidenav, 'toggle').and.callThrough();
    app.onNavItemClicked();
    expect(spy).toHaveBeenCalled();
  });

});
