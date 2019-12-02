import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import * as axe from 'axe-core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-test-accessibility'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-test-accessibility');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-test-accessibility!');
  });

  it('should be no accessibility issues', done => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    axe.run(compiled, {}, (err, results) => {
      if (err) {
        throw err;
      }

      if (results.violations.length > 0) {
        console.log(JSON.stringify(results.violations, null, 4));
      }

      expect(results.violations.length).toBe(0);
      done();
    });
  });

  // it('should be no accessibility issues', done => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;

  //   axe.a11yCheck(compiled, {}, result => {
  //     expect(result.violations.length).toBe(0);
  //     done();
  //   });
  // });
});
