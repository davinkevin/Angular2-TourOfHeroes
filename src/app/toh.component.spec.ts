/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { TohComponent } from './toh.component';
import {FormsModule} from '@angular/forms';
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';

describe('App: Angular2TourOfHeroes', () => {

  let fixture: ComponentFixture<TohComponent>,
      compiled: Element,
      app: TohComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TohComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TohComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Tour of Heroes'`, async(() => {
    expect(app.title).toEqual('Tour of Heroes');
  }));

  it('should have title in a h1 tag', async(() => {
    /* Given */
    /* When  */
    fixture.detectChanges();
    /* Then  */
    expect(compiled.querySelector('h1').textContent).toContain('Tour of Heroes');
  }));

  it('should have sub-title associated to hero.name', async(() => {
    /* Given */
    /* When  */
    fixture.detectChanges();
    /* Then  */
    expect(compiled.querySelector('h2').textContent).toContain('Windstorm details!');
  }));

  it('should have two-way binding on field and h2', () => {
    /* Given */
    fixture.detectChanges();
    /* When  */
    app.hero.name = 'Foo';
    fixture.detectChanges();
    /* Then  */
    expect(compiled.querySelector('h2').textContent).toContain('Foo details!');
  });

});
